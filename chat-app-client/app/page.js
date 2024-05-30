"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as bi from "react-icons/bi";
import config from "@/helpers/config";
import socket from "@/helpers/socket";
import Inactive from "@/components/pages/Inactive";
import { getSetting } from "@/services/setting.api";
import { setMaster, setSetting } from "@/redux/features/user";
import Auth from "@/components/pages/Auth";
import Chat from "@/components/pages/Chat";

export default function Home() {
  const dispatch = useDispatch();
  const { master } = useSelector((state) => state.user);

  const [inactive, setInactive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // get access token from localStorage
  const token = window?.localStorage?.getItem("token");

  const handleGetMaster = async (signal) => {
    try {
      if (token) {
        // set default authorization
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        // get account setting
        const setting = await getSetting({ signal });

        if (setting) {
          dispatch(setSetting(setting));

          const { data } = await axios.get("/users", { signal });
          // set master
          dispatch(setMaster(data.payload));
          socket.emit("user/connect", data.payload._id);
        }

        setLoaded(true);
      } else {
        setTimeout(() => setLoaded(true), 1000);
      }
    } catch (error0) {
      console.error(error0.message);
    }
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    // set default base url
    axios.defaults.baseURL = "http://103.145.138.54:8080/api";

    handleGetMaster(abortCtrl.signal);

    socket.on("user/inactivate", () => {
      setInactive(true);
      dispatch(setMaster(null));
    });

    return () => {
      abortCtrl.abort();
      socket.off("user/inactivate");
    };
  }, []);

  useEffect(() => {
    document.onvisibilitychange = (e) => {
      if (master) {
        const active = e.target.visibilityState === "visible";
        socket.emit(active ? "user/connect" : "user/disconnect", master._id);
      }
    };
  }, [!!master]);

  console.log("master: ", master);
  console.log("inactive: ", inactive);
  console.log("loaded: ", loaded);

  return (
    <>
      {loaded ? (
        <>
          {inactive && <Inactive />}
          {!inactive && master ? (
            <>{master.verified ? <Chat /> : <h1>veryfy</h1>}</>
          ) : (
            <Auth />
          )}
        </>
      ) : (
        // <h1>Welcome to ululuChat</h1>
        <div className="absolute w-full h-full flex justify-center items-center bg-black dark:text-white/90 dark:bg-spill-900">
          <div className="flex gap-2 items-center">
            <i className="animate-spin">
              <bi.BiLoaderAlt />
            </i>
            <p>Loading</p>
          </div>
        </div>
      )}
    </>
  );
}
