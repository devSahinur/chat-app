'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as bi from 'react-icons/bi';
import Setting from '@/components/appPage/Setting';
import Profile from '@/components/appPage/Profile';
import Minibox from '@/components/chat/foreground/Minibox';
import OpenContact from '@/components/chat/foreground/OpenContact';
import Header from '@/components/chat/foreground/Header';
import Inbox from '@/components/chat/foreground/Inbox';
import Contact from '@/components/appPage/Contact';
import NewGroup from '@/components/appPage/NewGroup';


const Foreground = () => {

    const chatRoom = useSelector((state) => state.room.chat);
    const refreshInbox = useSelector((state) => state.chore.refreshInbox);
  
    const [inboxes, setInboxes] = useState(null);
    const [search, setSearch] = useState('');
  
    const handleGetInboxes = async (signal) => {
      try {
        setInboxes(null);
  
        const { data } = await axios.get('/inboxes', {
          params: { search },
          signal,
        });
        setInboxes(data.payload);
      } catch (error0) {
        console.error(error0?.response?.data?.message);
      }
    };
  
    useEffect(() => {
      const abortCtrl = new AbortController();
      handleGetInboxes(abortCtrl.signal);
  
      return () => {
        abortCtrl.abort();
      };
    }, [refreshInbox, search]);

  return (
    <div
    className={`${
      chatRoom.isOpen && '-translate-x-full md:translate-x-0'
    } transition w-full h-full relative z-10 grid grid-rows-[auto_1fr] overflow-hidden`}
  >
    {
      // loading animation
      !inboxes && (
        <div className="absolute w-full h-full z-0 flex justify-center items-center bg-white dark:bg-spill-900">
          <span className="flex gap-2 items-center">
            <i className="animate-spin">
              <bi.BiLoaderAlt size={18} />
            </i>
            <p>Loading</p>
          </span>
        </div>
      )
    }
    {/* app Page in component */}
    <Setting/>
    <Contact />
    <Profile />
    <NewGroup />

  {/* components foreground */}
    <Minibox />
    <OpenContact />
    <Header setSearch={setSearch} />
    <Inbox inboxes={inboxes} setInboxes={setInboxes} />

  </div>
  )
}

export default Foreground