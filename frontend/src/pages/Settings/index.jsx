import React, { useState, useEffect, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Slider from '@mui/material/Slider';
import { Reveal } from 'react-awesome-reveal';
import Sidebar from '../../components/menu/SideBar';
import { IsSmMobile, numberWithCommas, fadeInUp, fadeIn } from '../../utils';
import Subheader from '../../components/menu/SubHeader';
import ConnectWallet from '../../components/menu/ConnectWallet';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import { Link } from '@reach/router';


const SettingsBody = () => {
  const [name, setName] = useState('');
  const [bGitHub, setGitHub] = useState('');
  const [discord, setDiscord] = useState('');

  const handleName = useCallback((event) => {
    setName(event.target.value);
  }, []);
  const handleGitHub = useCallback((event) => {
    setGitHub(event.target.value);
  }, []);
  const handleDiscord = useCallback((event) => {
    setDiscord(event.target.value);
  }, []);

  useEffect(() => {
  }, []);

  return (
    <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
      <div className='app-card h-auto'>
        <div className='w-3/3 md:w-full xl:h-fit'>
          <div className='row'>
              <div className='w-full pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Name</label>
                  <div className="input-control">
                    <input type="text" name="name" value={name} className='input-main' onChange={handleName}></input>
                  </div>
                </div>
              </div>
              <div className='w-full pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>GitHub Profile</label>
                  <div className="input-control">
                    <input type="text" name="bGitHub" value={bGitHub} className='input-main' onChange={handleGitHub}></input>
                  </div>
                </div>
              </div>
              <div className='w-full pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Discord#</label>
                  <div className="input-control">
                    <input type="text" name="discord" value={discord} className='input-main' onChange={handleDiscord}></input>
                  </div>
                </div>
              </div>
              <div className='md:w-2/3 pb-3 w-1/3'>
                <div className='input-form-control'>
                  <div className="input-control border-0 ">
                    <button className='input-main btn-hover text-white text-[]' onClick={() => { }}>Save Changes</button></div>
                </div>
              </div> 
          </div>
        </div>
      </div>
    </Reveal>
  )
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
  )
}

export default Settings;