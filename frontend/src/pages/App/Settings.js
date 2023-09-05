import React, { useState, useEffect, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Slider from '@mui/material/Slider';
import { Reveal } from 'react-awesome-reveal';
import Sidebar from '../../components/menu/SideBar';
import { IsSmMobile, numberWithCommas, fadeInUp, fadeIn } from '../../utils';
import { config, def_config } from '../../config';
import Subheader from '../../components/menu/SubHeader';
import ConnectWallet from '../../components/menu/ConnectWallet';
import { useSigningClient } from '../../context/web3Context';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';

const ChartURL = `https://teams.bogged.finance/embeds/chart?address=${config.ETR_CONTRACT}&chain=bsc&charttype=line&theme=bg:06302566|bg2:036b60FF|primary:024643FF|secondary:5cf28fff|text:F3F6FBFF|text2:F3F6FBFF|candlesUp:1BC870FF|candlesDown:ff4976ff|chartLine:15d465FF&defaultinterval=15m&showchartbutton=true`;

const SettingsBody = () => {
  const {
    balance
  } = useSigningClient();

  const DEF_APY = (def_config.APY * 100).toFixed(2);
  const [ETRPrice, setETRPrice] = useState('0.07');
  const [title, setTitle] = useState('');
  const [apy, setAPY] = useState(DEF_APY);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [futurePrice, setFuturePrice] = useState(0);
  const [days, setDays] = useState(30);
  const [initAmount, setInitAmount] = useState(0);
  const [wealth, setWealth] = useState(0);
  const [rewardEst, setRewardEst] = useState(0);
  const [potentialReturn, setPotentialReturn] = useState(0);

  useEffect(() => {
    setInitAmount((Number(title) * Number(purchasePrice)));
    setWealth((Number(title) * Number(ETRPrice)));
    const rewards = ((((Number(apy) + 100) / 100) ** (days / 365)) * Number(title));
    setRewardEst(rewards);
    setPotentialReturn((rewards * Number(futurePrice)));
  }, [title, apy, purchasePrice, futurePrice, days, ETRPrice]);

  const handleSlide = useCallback((event, value) => {
    setDays(value);
  }, []);

  const handleTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleAPY = useCallback((event) => {
    setAPY(event.target.value);
  }, []);

  const handlePurchasePrice = useCallback((event) => {
    setPurchasePrice(event.target.value);
  }, []);

  const handleFuturePrice = useCallback((event) => {
    setFuturePrice(event.target.value);
  }, []);

  const handleMax = useCallback(() => {
    if (balance.ETR !== '')
      setTitle(Number(balance.ETR));
    else {
      setTitle(0);
    }
  }, [balance]);

  return (
    <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
    <div className='app-card h-auto'>
        <div className='app-header'>
            <div className='row'>
            <div className='w-full xl:w-full xl:h-fit lg:w-full md:w-full'>
                <div className='mt-3'>
                <div className='row'>
                    <div className='w-2/3'>
                    <div className='row'>
                        <div className='w-full pb-3'>
                        <div className='input-form-control'>
                            <label className='input-label'>Name</label>
                            <div className="input-control">
                            <input type="text" name="amount" value={title} className='input-main' onChange={handleTitle}></input>
                            </div>
                        </div>
                        </div>
                        <div className='w-full pb-3'>
                        <div className='input-form-control'>
                            <label className='input-label'>GitHub Profile</label>
                            <div className="input-control">
                            <input type="text" name="apy" value={apy} className='input-main' onChange={handleAPY}></input>
                            </div>
                        </div>
                        </div>
                        <div className='w-full pb-3'>
                        <div className='input-form-control'>
                            <label className='input-label'>Bounty Type</label>
                            <div className="input-control">
                            <input type="number" name="purchasePrice" value={purchasePrice} className='input-main' onChange={handlePurchasePrice}></input>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
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
      <MainHeader/>
      <Sidebar path="Settings" />
      <div className='app-container'>
        <div className='app-header xl:items-center sm:flex-col'>
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
            <Scrollbars autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <SettingsBody />
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
    <HelpButton/>
  </div>
)}

export default Settings;