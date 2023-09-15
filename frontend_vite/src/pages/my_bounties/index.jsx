/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState, useEffect, useCallback, useReducer, useRef } from 'react';
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
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import SearchBox from '../../components/menu/SearchBox';
import WarningMsg from '../../components/WarningMsg';
import { MyBountyBodyListItem } from './MyBountiesBody';
import { fadeInUp, fadeIn, IsSmMobile, numberWithCommas } from '../../utils';
import { useCustomWallet } from '../../context/WalletContext';
import useBackend from '../../hooks/useBackend';

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
  const { isConnected, walletAddress } = useCustomWallet();
  const { getCreatedBounties } = useBackend();

  const [bounties, setBounties] = useState([]);
  
  const [isSearchShow, setShow] = useState(false);
  
  const searchbox = useRef(null);

  useEffect(() => {
    async function fetchBounties() {
      if (!isConnected)
        return;

      const createdBounties = await getCreatedBounties(walletAddress);
      console.log('createdBounties:', createdBounties);
      setBounties(createdBounties);
    }

    fetchBounties();
  }, [isConnected, walletAddress]);

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
            <SearchBox ref={searchbox} callback={() =>{ setShow( isSearchShow => !isSearchShow ) }}/>
          </div>
          {!isConnected &&
            <WarningMsg msg='You need to connect your wallet in order to submit a work.' />
          }
          <div className={`app-content ${isSearchShow ? 'blur-sm' : ''}`}>
            {IsSmMobile() ? (
              bounties?.map((bounty, idx) => (
                <MyBountyBodyListItem key={idx} bountyId={bounty.bountyId} />
              ))
            ) : (
              <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                {bounties?.map((bounty, idx) => (
                    <MyBountyBodyListItem key={idx} bountyId={bounty.bountyId} />
                  ))
                }
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
