import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import SearchBox from '../../components/menu/SearchBox';
import WarningMsg from '../../components/WarningMsg';
// import InBountiesBody from './InBountiesBody';
import InBounty from './InBounty';
import { IsSmMobile, fadeInUp } from '../../utils';
import { useCustomWallet } from '../../context/WalletContext';
import useBackend from '../../hooks/useBackend';

const InProgress = () => {
  const { isConnected, walletAddress } = useCustomWallet();
  const { getAppliedBounties } = useBackend();
  
  const [bounties, setBounties] = useState([]);

  const [isSearchShow, setShow] = useState(false);
  
  const searchbox = useRef(null);

  useEffect(() => {
    async function fetchBounties() {
      if (!walletAddress)
        return;

      const appliedBounties = await getAppliedBounties(walletAddress);
      console.log('appliedBounties:', appliedBounties);
      setBounties(appliedBounties);
    }

    fetchBounties();
  }, [walletAddress]);


  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <Sidebar path="InProgress" />
        <div className='app-container'>
          <Subheader path="InProgress" />
          <div className='app-header items-center md:items-start sm:flex-col lg:pl-0 pl-[40px] pr-0 relative z-[99]'>
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
              <div className='app-title'>
                <p className='text-[40px] lg:text-[32px] md:text-[24px] sm:text-center text-white'>In Progress</p>
              </div>
            </Reveal>
            <SearchBox ref={searchbox} callback={() =>{ setShow( isSearchShow => !isSearchShow ) }}/>
          </div>
          
	      {!isConnected &&
            <WarningMsg msg='You need to connect your wallet in order to submit a work.' />
          }
          
          <div className={`app-content ${isSearchShow ? 'blur-sm' : ''}`}>
            {IsSmMobile() ? (
              // <InBountiesBody bounties={bounties} />
              bounties?.map((bounty, idx) => {
                return (
                  <InBounty key={idx} bountyId={bounty.bountyId} />
                );
              })
            ) : (
              <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                {/* <InBountiesBody bounties={bounties} /> */
                bounties?.map((bounty, idx) =>
                    <InBounty key={idx} bountyId={bounty.bountyId} />
                )
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

export default InProgress;
