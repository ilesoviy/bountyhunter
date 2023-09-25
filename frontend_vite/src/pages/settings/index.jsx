import React, { useState, useEffect, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import { toast } from "react-toastify";

import { useCustomWallet } from '../../contexts/WalletContext';
import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import WarningMsg from '../../components/WarningMsg';
import useBackend from '../../hooks/useBackend';
import { IsSmMobile, numberWithCommas, fadeInUp, fadeIn } from '../../utils';

const SettingsBody = () => {
  const { walletAddress, isConnected } = useCustomWallet();
  const { getUser, setUser } = useBackend();
  const [name, setName] = useState('');
  const [github, setGitHub] = useState('');
  const [discord, setDiscord] = useState('');
  const [selImage, setSelImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  
  const handleName = useCallback((event) => {
    setName(event.target.value);
  }, []);
  const handleGitHub = useCallback((event) => {
    setGitHub(event.target.value);
  }, []);
  const handleDiscord = useCallback((event) => {
    setDiscord(event.target.value);
  }, []);
  const handleImage = useCallback((event) => {
    setSelImage(event.target.files[0]);
  }, []);
  const handleSave = useCallback((event) => {
    if (!isConnected) {
      toast.warning(`Wallet not connected yet!`);
      return;
    }

    if (!setUser(walletAddress, name, github, discord, selImage)) {
      toast.error('Failed to save user information!');
      return;
    }

    toast('Saved user information!');
  }, [isConnected, walletAddress, name, github, discord, selImage]);

  useEffect(() => {
    async function fetchUser() {
      if (!isConnected) {
        setName('');
        setGitHub('');
        setDiscord('');
        setSelImage(null);
        setAvatar(null);
      } else {
        const user = await getUser(walletAddress);
        setName(user.name);
        setGitHub(user.github);
        setDiscord(user.discord);
        setSelImage(null);
        setAvatar(user.img);
      }
    }
    fetchUser();
  }, [isConnected, walletAddress]);

  return (
    <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
      {
        isConnected ?
          (<div className='app-card h-auto'>
            <div className='w-3/3 md:w-full xl:h-fit'>
              <div className='row pl-[20px]'>
                <div className='flex'>
                  <div className="relative flex items-center justify-center">
                    {selImage ?
                      (<img id="image" name="image" alt="" className="w-[120px] h-[120px] rounded-full" src={URL.createObjectURL(selImage)} />)
                    : (avatar ? 
                      <img id="image" name="image" alt="" className="w-[120px] h-[120px] rounded-full" src={`data:image/${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`} />
                      : <img id="image" name="image" alt="" src={'/images/banner/unknown.png'} />)}
                    <div className='absolute right-0 bottom-0 w-[30px] h-[30px] flex bg-[#011829] flex justify-center items-center rounded-full cursor-pointer'>
                      <i className='fa fa-pencil' />
                    </div>
                    <input
                      type="file"
                      name="myImage"
                      accept="image/*"
                      className="absolute right-0 bottom-0 w-[30px] h-[30px] opacity-0"
                      onChange={handleImage}
                    />
                  </div>
                </div>                
                <div className='w-full pb-3'>
                  <div className='input-form-control'>
                    <label className='input-label'>Name</label>
                    <div className="input-control">
                      <input type="text" id="name" name="name" value={name} className='input-main' onChange={handleName}></input>
                    </div>
                  </div>
                </div>
                <div className='w-full pb-3'>
                  <div className='input-form-control'>
                    <label className='input-label'>GitHub Profile</label>
                    <div className="input-control">
                      <input type="text" id="gitHub" name="gitHub" value={github} className='input-main' onChange={handleGitHub}></input>
                    </div>
                  </div>
                </div>
                <div className='w-full pb-3'>
                  <div className='input-form-control'>
                    <label className='input-label'>Discord#</label>
                    <div className="input-control">
                      <input type="text" id="discord" name="discord" value={discord} className='input-main' onChange={handleDiscord}></input>
                    </div>
                  </div>
                </div>
                <div className='md:w-2/3 pb-3 w-1/3'>
                  <div className='input-form-control'>
                    <div className="input-control border-0 ">
                      <button type="submit" className='input-main btn-hover text-white text-[]' onClick={handleSave}>Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
           :
          (<WarningMsg msg='You need to connect your wallet in order to save settings.' />)
      }
    </Reveal>
  );
}

const Settings = () => {

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <Sidebar path="Settings" />
        <div className='app-container '>
          <div className='app-header md:items-start sm:flex-col'>
            <Subheader path="Settings" />
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
              <div className='app-title'>
                <p className='text-[40px] sm:text-center text-white'>Settings</p>
              </div>
            </Reveal>
          </div>
          <div className='app-content'>
            {IsSmMobile() ? (
              <SettingsBody />
            ) : (
              <Scrollbars id='body-scroll-bar' style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                <SettingsBody />
              </Scrollbars>
            )}
          </div>
        </div>
      </div>
      <HelpButton />
    </div>
  );
}

export default Settings;
