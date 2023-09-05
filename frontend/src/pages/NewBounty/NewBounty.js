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
import { Link } from '@reach/router';

const NewBountyBody = () => {
  const {
    balance
  } = useSigningClient();

  // const navigation = useNavigate();

  // const DEF_APY = (def_config.APY * 100).toFixed(2);
  const DEF_APY = 0;

  const [title, setTitle] = useState('');
  const [apy, setAPY] = useState(DEF_APY);
  const [bType, setBType] = useState('');
  const [bDifficulty, setBDifficulty] = useState('');
  const [bTopic, setBTopic] = useState('');
  const [bDesc, setbDesc] = useState('');
  const [bGitHub, setBGitHub] = useState('');

  useEffect(() => {
    // setInitAmount((Number(title) * Number(purchasePrice)));
    // setWealth((Number(title) * Number(ETRPrice)));
    // const rewards = ((((Number(apy) + 100) / 100) ** (days / 365)) * Number(title));
    // setRewardEst(rewards);
    // setPotentialReturn((rewards * Number(futurePrice)));
  }, [title, apy, bType, bDifficulty, bTopic, bDesc, bGitHub]);

  const handleTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleAPY = useCallback((event) => {
    setAPY(event.target.value);
  }, []);

  const handleBType = useCallback((event) => {
    setBType(event.target.value);
  }, []);

  const handleBDifficulty = useCallback((event) => {
    setBDifficulty(event.target.value);
  }, []);

  const handleBTopic = useCallback((event) => {
    setBTopic(event.target.value);
  }, []);

  const handleBDesc = useCallback((event) => {
    setbDesc(event.target.value);
  }, []);

  const handleBGitHub = useCallback((event) => {
    setBGitHub(event.target.value);
  }, []);

  return (
    <div className='app-body pl-[20px] pr-0'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-full xl:w-full xl:h-fit lg:w-full md:w-full'>
            <div className='mt-3'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-12 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Title</label>
                        <div className="input-control">
                          <input type="text" name="title" value={title} className='input-main' onChange={handleTitle}></input>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Payment Amount</label>
                        <div className="input-control">
                          <input type="number" name="apy" value={apy} className='input-main' onChange={handleAPY}></input>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Dead Line</label>
                        <div className="input-control">
                          <select name="bDeadLine" className='input-main'>
                            <option>More than 6 months</option>
                            <option>3 to 6 months</option>
                            <option>1 to 3 months</option>
                            <option>Less than 1 month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Bounty Type</label>
                        <div className="input-control">
                          <input type="text" name="bType" value={bType} className='input-main' onChange={handleBType}></input>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Bounty Difficulty</label>
                        <div className="input-control">
                          <input type="text" name="bDifficulty" value={bDifficulty} className='input-main' onChange={handleBDifficulty}></input>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Bounty Topic</label>
                        <div className="input-control">
                          <input type="text" name="bTopic" value={bTopic} className='input-main' onChange={handleBTopic}></input>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Description</label>
                        <div className="input-control h-[70px]">
                          <textarea type="text" name="bDesc" value={bDesc} className='input-main' onChange={handleBDesc}></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div className='col-md-12 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Github Link</label>
                        <div className="input-control">
                          <input type="text" name="bGitHub" value={bGitHub} className='input-main' onChange={handleBGitHub}></input>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 pb-3'>
                      <div className='input-form-control'>
                        <div className="input-control">
                          {/* <button className='input-main' onClick={navigateToPreview}>Preview</button> */}
                          <Link to="/NewBounty/preview" className='w-full text-center'>Prevew</Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 pb-3'>
                      <div className='input-form-control'>
                        <div className="input-control">
                          <button className='input-main text-white' onClick={() => { }}>Submit</button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

const NewBounty = () => (
  <div className='full-container'>
    <div className='container'>
      <MainHeader />
      <Sidebar path="NewBounty" />
      <div className='app-container'>
        <Subheader path="NewBounty" />
        <Reveal keyframes={fadeInUp} className='onStep' delay={200} duration={400} triggerOnce>
          <div className='app-header pl-[40px] pr-0 '>
            <div className='app-card w-full bg-[#0092DC] py-4'>
              <div className='flex gap-3'>
                <span className="text-xl"><i className='fa fa-exclamation-circle'></i></span>
                <div className='flex flex-col'>
                  <p className='text-[17px] sm:text-[15px]'>You need to connect your wallet in order to create a bounty.</p>
                  <span className='font-bold'>Learn More</span>
                </div>
              </div>
            </div>
            {/* <Subheader path="NewBounty" /> */}
          </div>
        </Reveal>
        <div className='app-content'>
          {IsSmMobile() ? (
            <NewBountyBody />
          ) : (
            <Scrollbars autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <NewBountyBody />
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
  </div>
)
export default NewBounty;