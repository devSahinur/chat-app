'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Signout from '../modals/Signout';
import { setModal } from '@/redux/features/modal';
import ChangePass from '../modals/ChangePass';
import DeleteAcc from '../modals/DeleteAcc';
import Qr from '../modals/Qr';
import NewContact from '../modals/NewContact';
import ConfirmNewGroup from '../modals/ConfirmNewGroup';
import AvatarUpload from '../modals/AvatarUpload';
import Webcam from '../modals/Webcam';
import ImageCropper from '../modals/ImageCropper';
import PhotoFull from '../modals/PhotoFull';
import ConfirmDeleteChat from '../modals/ConfirmDeleteChat';
import SendFile from '../modals/SendFile';
import ConfirmAddParticipant from '../modals/ConfirmAddParticipant';
import EditGroup from '../modals/EditGroup';
import ConfirmExitGroup from '../modals/ConfirmExitGroup';
import ConfirmDeleteContact from '../modals/ConfirmDeleteContact';
import ConfirmDeleteChatAndInbox from '../modals/ConfirmDeleteChatAndInbox';
import Foreground from '@/containers/Foreground';
import Room from '@/containers/Room';

const Chat = () => {
    const dispatch = useDispatch();
    const imageCropper = useSelector((state) => state.modal.imageCropper);
    const master = useSelector((state) => state.user.master);


    const requestNotification = async () => {
        if (Notification.permission !== 'granted') {
          // ask the user for permission
          await Notification.requestPermission();
        }
      };
    
      useEffect(() => {
        requestNotification();
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', () => {
          window.history.pushState(null, '', window.location.href);
        });
      }, []);

  return (
    <div
    aria-hidden
    className="absolute w-full h-full overflow-hidden grid md:grid-cols-[380px_1fr] "
    onClick={() => {
      // close all modals
      dispatch(setModal({ target: '*' }));
    }}
  >
    <Signout />
    <ChangePass />
    <DeleteAcc />
    <Qr />
    <NewContact />
    <ConfirmNewGroup />
    <AvatarUpload />
    <Webcam />
    {imageCropper && <ImageCropper />}
    <PhotoFull/>
    <ConfirmDeleteChat />
    <SendFile/>
    <ConfirmAddParticipant />
    <EditGroup/>
    <ConfirmExitGroup/>
    <ConfirmDeleteContact/>
    <ConfirmDeleteChatAndInbox/>

    <Foreground/>
    <Room/>
  </div>
  )
}

export default Chat