/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { createGlobalStyle } from 'styled-components';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ReactToolTip from 'react-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../../components/menu/SideBar';
// import SelectCoin from '../../components/app/SelectCoin';
import { fadeInUp, fadeIn, IsSmMobile, numberWithCommas } from '../../utils';
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import MyBountiesBody from './MyBountiesBody';
import HelpButton from '../../components/menu/HelpButton';

const GlobalStyles = createGlobalStyle`
  .swap-card {
    width: 600px;
    padding: 15px 20px;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    @media only screen and (max-width: 1279px) {
      width: 500px;
    }

    @media only screen and (max-width: 639px) {
      width: 100%;
    }
  }

  .input-token-panel {
    display: flex;
    position: relative;
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.2) 0%, rgba(0, 232, 125, 0.2) 87.58%, rgba(0, 230, 106, 0.2) 100%);
    border-radius: 20px;
    flex-direction: column;
    text-align: left;
    padding: 20px 16px 10px;
    gap: 10px;
    border: solid 1px #036b60;
  }

  .input-token {
    width: 60%;
    background: transparent;
    outline: none;
    font-family: "Poppins", Helvetica, Arial, sans-serif;
    font-size: 22px;
    color: #ffb84d;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
  }

  .slippage-form {
    width: 60%;
    border: solid 1px white;
    border-radius: 10px;
    .input-slippage {
      width: 100%;
      background: transparent;
      outline: none;
      padding: 5px 10px;
      font-family: 'Poppins';
      font-size: 16px;
      font-weight: 400;
      color: white;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }  

  .btn-change {
    background-color: #ffb84d !important;
    border-radius: 50% !important;
    &:hover {
      background: #e9c083 !important;
    }
  }

  .btn-swap {
    width: 100%;
    padding: 10px;
    font-family: 'Poppins';
    font-size: 18px;
    border-radius: 8px;
    background: linear-gradient(90deg, #7A1BFF -3.88%, #5947FF 100%);
    &.approve {
      background: #4ed047;
    }
    :disabled {
      background: #626262b3;
    }
  }

  .btn-max {
    padding: 0px 5px;
    margin: 10px 10px 10px 0px;
    &:hover {
      background: #0d6b4a;
      border-radius: 8px;
    }
  }

  .btn-select-coin {
    padding: 0px 15px;
    margin: 10px 0px;
    &:hover {
      background: #4c3486;
      border-radius: 8px;
    }
  }

  .swap-color {
    color: #ffb84d;
  }

  .MuiChip-label {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 18px;
  }

  .calc-label {
    font-family: "Poppins";
    font-size: 16px;
    font-weight: 400;
    color: #BCC3CF;
  }
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#137655',
  borderRadius: '20px',
  boxShadow: 24,
  pt: 4,
  pb: 4,
  px: 3,
};

const magic_coin = [
  { code: 2, label: 'ETR' },
];

const coinLabel = (arrange, coinType) => {
  if (arrange && coinType === 0) {
    return 'BNB';
  } else if (arrange && coinType === 1) {
    return 'BUSD';
  } else {
    return 'ETR';
  }
}

const MyBounties = () => {
  const [keyword, setKeyword] = useState('');

  const [isSearchShow, setSearchShow] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isCompe, setComp] = useState(false);
  const [isCoop, setCoop] = useState(false);
  const [isHack, setHack] = useState(false);
  const [isBegin, setBegin] = useState(false);
  const [isInter, setInter] = useState(false);
  const [isAdvan, setAdvan] = useState(false);
  const [isDesig, setDesig] = useState(false);
  const [isDevel, setDevel] = useState(false);
  const [isSmtCt, setSmtCt] = useState(false);
  const [isData, setData] = useState(false);
  const [isAI, setAI] = useState(false);

  const handleClosed = useCallback(() => {
    setClosed(isClosed => !isClosed);
  }, []);
  const handleActive = useCallback(() => {
    setActive(isActive => !isActive);
  }, []);
  const handleComp = useCallback(() => {
    setComp(isCompe => !isCompe);
  }, []);
  const handleCoop = useCallback(() => {
    setCoop(isCoop => !isCoop);
  }, []);
  const handleHack = useCallback(() => {
    setHack(isHack => !isHack);
  }, []);
  const handleBegin = useCallback(() => {
    setBegin(isBegin => !isBegin);
  }, []);
  const handleInter = useCallback(() => {
    setInter(isInter => !isInter);
  }, []);
  const handleAdvan = useCallback(() => {
    setAdvan(isAdvan => !isAdvan);
  }, []);
  const handleDesig = useCallback(() => {
    setDesig(isDesig => !isDesig);
  }, []);
  const handleDevel = useCallback(() => {
    setDevel(isDevel => !isDevel);
  }, []);
  const handleSmtCt = useCallback(() => {
    setSmtCt(isSmtCt => !isSmtCt);
  }, []);
  const handleData = useCallback(() => {
    setData(isData => !isData);
  }, []);
  const handleAI = useCallback(() => {
    setAI(isAI => !isAI);
  }, []);

  const handleSearchShow = useCallback(() => {
    setSearchShow(isSearchShow => !isSearchShow);
  }, []);

  const handleKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, []);

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <Sidebar path="MyBounties" />
        <div className='app-container'>
          <Subheader path="MyBounties" />
          <div className='app-header md:items-start sm:flex-col lg:pl-0 pl-[40px] pr-0 relative z-[99]'>
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
              <div className='app-title'>
                <p className='text-[40px] lg:text-[32px] md:text-[24px] text-white'>My Bounties</p>
              </div>
            </Reveal>
            {/* SearchBox start */}
            <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
              <div className='flex gap-4 items-center'>
                <div className='input-form-control relative z-50'>
                  <div className={`input-control rounded-3xl h-[60px] ${isSearchShow ? 'invisible' : ''}`}>
                    <i className="fa input-prefix fa-search"></i>
                    <input type="text" value={keyword} onChange={handleKeyword} className='input-main mx-3' placeholder='Search'></input>
                    <button className="input-suffix flex items-center gap-2 border-l-1" onClick={handleSearchShow}>
                      Filter<i className='fa fa-angle-down' />
                    </button>
                  </div>
                  {
                    isSearchShow &&
                    <div className='left-0 right-0 top-0 bottom-0 fixed z-0' onClick={() => setSearchShow(isSearchShow => false)}></div>
                  }
                  {isSearchShow &&
                    <section className='absolute right-0 top-0 left-0 rounded-3xl border-0 bg-[#00263e]'>
                      <div className="input-control h-[60px]  border-0">
                        <i className="fa fa-search input-prefix"></i>
                        <input type="text" value={keyword} onChange={handleKeyword} className='input-main border-r-1 mx-3' placeholder='Search'></input>
                        <button className="input-suffix flex items-center gap-2 border-l-1" onClick={handleSearchShow}>
                          <i className='fa fa-angle-up' />
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 p-4'>
                        <div className='font-bold'>Status</div>
                        <div className='flex gap-4 '>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleClosed} checked={isClosed} className=''></input><label>Closed</label></div>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleActive} checked={isActive} className=''></input><label>Active</label></div>
                        </div>
                        <div className='font-bold'>Type</div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleComp} checked={isCompe} className=''></input><label>Competitive</label></div>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleCoop} checked={isCoop} className=''></input><label>Cooperative</label></div>
                        </div>
                        <div className='font gap-2'>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleHack} checked={isHack} className=''></input><label>Hackathon</label></div>
                        </div>
                        <div className='font-bold'>Difficulty</div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleBegin} checked={isBegin} className=''></input><label>Beginner</label></div>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleInter} checked={isInter} className=''></input><label>Intermediate</label></div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleAdvan} checked={isAdvan} className=''></input><label>Advanced</label></div>
                        </div>
                        <div className='font-bold'>Topic</div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleDesig} checked={isDesig} className=''></input><label>Design</label></div>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleDevel} checked={isDevel} className=''></input><label>Development</label></div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleSmtCt} checked={isSmtCt} className=''></input><label>Smart Contracts</label></div>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleData} checked={isData} className=''></input><label>Data</label></div>
                          <div className='flex gap-1 items-center'><input type='checkbox' onChange={handleAI} checked={isAI} className=''></input><label>AI</label></div>
                        </div>
                      </div>
                    </section>}
                </div>
              </div>
            </Reveal>
            {/* SearchBox end */}
          </div>
          <div className={`app-content ${isSearchShow ? 'blur-sm' : ''}`}>
            {IsSmMobile() ? (
              <MyBountiesBody />
            ) : (
              <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                <MyBountiesBody />
              </Scrollbars>
            )}
          </div>
        </div>
      </div>
      <HelpButton />
    </div>
  );
}

export default MyBounties;
