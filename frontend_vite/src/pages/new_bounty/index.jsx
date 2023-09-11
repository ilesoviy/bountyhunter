import React, { useState, useEffect, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import { Link } from '@reach/router';

import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import WarningMsg from '../../components/WarningMsg';
import { IsSmMobile, fadeInUp, fadeIn } from '../../utils';

import { useCustomWallet } from '../../context/WalletContext';
import useBounty from '../../hooks/useBounty';
import useBackend from '../../hooks/useBackend';


const NewBountyBody = () => {
  const { walletAddress, isConnected } = useCustomWallet();
  const { createBounty } = useBounty();
  const { addBounty } = useBackend();

  const DEF_PAY_TOKEN = 'd93f5c7bb0ebc4a9c8f727c5cebc4e41194d38257e1d0d910356b43bfc5288131'; // ilesoviy - ???
  const DEF_PAY_AMOUNT = 0;
  const SECS_PER_DAY = 24 * 60 * 60;

  const [title, setTitle] = useState('');
  const [payAmount, setPayAmount] = useState(DEF_PAY_AMOUNT);
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topic, setTopic] = useState('');
  const [desc, setDesc] = useState('');
  const [gitHub, setGitHub] = useState('');

  useEffect(() => {
  }, []);

  const onChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const onChangePayAmount = useCallback((event) => {
    setPayAmount(event.target.value);
  }, []);

  const onChangeType = useCallback((event) => {
    setType(event.target.value);
  }, []);

  const onChangeDuration = useCallback((event) => {
    setDuration(event.target.value);
  }, []);

  const onChangeDifficulty = useCallback((event) => {
    setDifficulty(event.target.value);
  }, []);

  const onChangeTopic = useCallback((event) => {
    setTopic(event.target.value);
  }, []);

  const onChangeDesc = useCallback((event) => {
    setDesc(event.target.value);
  }, []);

  const onChangeGitHub = useCallback((event) => {
    setGitHub(event.target.value);
  }, []);

  const getDuration = useCallback(
    (duration) => {
      if (duration === '1') { // More than 6 months
        return 365;
      } else if (duration === '2') { // 3~6 months
        return 183;
      } else if (duration === '3') { // 1~3 months
        return 92;
      } else  if (duration === '4') { // Less than 1 month
        return 31;
      } else {
        console.log('Please select a duratin!');
        return 0;
      }
    }, 
    []
  );

  const handleSubmit = useCallback((event) => {
    const days = getDuration(duration);
    if (days === 0) {
      return;
    }

    const bountyId = createBounty(walletAddress, title, payAmount, DEF_PAY_TOKEN, SECS_PER_DAY * days);
    if (bountyId === undefined) {
      console.log('failed to create new bounty!');
      return;
    }

    const res = addBounty(bountyId, walletAddress, 
      title, payAmount, desc, SECS_PER_DAY * days, 
      type, topic, difficulty, 
      /* block */111);
    if (!res) {
      console.log('failed to add bounty!');
      return;
    }

    console.log('successfully added bounty!');
  }, [walletAddress, title, payAmount, desc, duration, type, topic, difficulty]);

  return (
    <div className='app-body lg:pl-0 pl-[20px] pr-0 mt-3'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>

        <div className='w-full xl:w-full xl:h-fit lg:w-full md:w-full'>
          <div className='col-md-12'>
            <div className='row m-0'>
              <div className='col-md-12 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Title</label>
                  <div className="input-control">
                    <input type="text" name="title" value={title} className='input-main' onChange={onChangeTitle}></input>
                  </div>
                </div>
              </div>
              <div className='col-md-6 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Payment Amount</label>
                  <div className="input-control">
                    <input type="number" name="payAmount" value={payAmount} className='input-main' onChange={onChangePayAmount}></input>
                  </div>
                </div>
              </div>
              <div className='col-md-6 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Dead Line</label>
                  <div className="input-control">
                    <select name="deadline" defaultValue={0} className='input-main' onChange={onChangeDuration}>
                      <option value={0} disabled hidden>Select a duration</option>
                      <option value={1}>More than 6 months</option>
                      <option value={2}>3 to 6 months</option>
                      <option value={3}>1 to 3 months</option>
                      <option value={4}>Less than 1 month</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-md-4 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Bounty Type</label>
                  <div className="input-control">
                    <select name="type" defaultValue={0} className='input-main' onChange={onChangeType}>
                      <option value={0} disabled hidden>Select a type</option>
                      <option value={1}>Competitive</option>
                      <option value={2}>Cooperative</option>
                      <option value={3}>Hackathon</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-md-4 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Bounty Difficulty</label>
                  <div className="input-control">
                    <select name="difficulty" defaultValue={0} className='input-main' onChange={onChangeDifficulty}>
                      <option value={0} disabled hidden>Select a difficulty</option>
                      <option value={1}>Beginner</option>
                      <option value={2}>Intermediate</option>
                      <option value={3}>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-md-4 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Bounty Topic</label>
                  <div className="input-control">
                    <select name="topic" defaultValue={0} className='input-main' onChange={onChangeTopic}>
                      <option value={0} disabled hidden>Select a topic</option>
                      <option value={1}>Design</option>
                      <option value={2}>Development</option>
                      <option value={3}>Smart Contracts</option>
                      <option value={4}>Data</option>
                      <option value={5}>AI</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-md-12 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Description</label>
                  <div className="input-control h-[70px]">
                    <textarea type="text" name="desc" value={desc} className='input-main' onChange={onChangeDesc}></textarea>
                  </div>
                </div>
              </div>

              <div className='col-md-12 pb-3'>
                <div className='input-form-control'>
                  <label className='input-label'>Github Link</label>
                  <div className="input-control">
                    <input type="text" name="gitHub" value={gitHub} className='input-main' onChange={onChangeGitHub}></input>
                  </div>
                </div>
              </div>
              <div className='col-md-4 pb-3'>
                <div className='input-form-control'>
                  <div className="input-control border-0">
                    {/* <button className='input-main' onClick={navigateToPreview}>Preview</button> */}
                    <Link to="/NewBounty/Preview" className='w-full text-center btn-hover'>Prevew</Link>
                  </div>
                </div>
              </div>
              <div className='col-md-4 pb-3'>
                <div className='input-form-control'>
                  <div className="input-control border-0">
                    <button className='input-main btn-hover text-white' onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </Reveal>
    </div>
  );
}

const NewBounty = () => (
  <div className='full-container'>
    <div className='container'>
      <MainHeader />
      <Sidebar path="NewBounty" />
      <div className='app-container'>
        <Subheader path="NewBounty" />

        <div className='pl-[40px] lg:pl-0'>
          <WarningMsg msg='You need to connect your wallet in order to create a bounty.' />
        </div>
        {/* <Reveal keyframes={fadeInUp} className='onStep' delay={200} duration={400} triggerOnce>
          <div className='app-header xl:pl-[40px] lg:pl-0 pr-0 '>
            <div className='app-card w-full bg-[#0092DC] py-4'>
              <div className='flex gap-3'>
                <span className="text-xl"><i className='fa fa-exclamation-circle'></i></span>
                <div className='flex flex-col'>
                  <p className='text-[17px] sm:text-[15px]'>You need to connect your wallet in order to create a bounty.</p>
                  <span className='font-bold'>Learn More</span>
                </div>
              </div>
            </div>
            {/* <Subheader path="NewBounty" /> 
          </div>
        </Reveal> */}
        
        <div className='app-content'>
          {IsSmMobile() ? (
            <NewBountyBody />
          ) : (
            <Scrollbars id='body-scroll-bar' className='' style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <NewBountyBody />
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
    <HelpButton />
  </div>
);

export default NewBounty;
