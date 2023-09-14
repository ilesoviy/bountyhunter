import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import InBountiesBody from './InBountiesBody';
import { IsSmMobile, fadeInUp } from '../../utils';
import useBackend from '../../hooks/useBackend';
import SearchBox from '../../components/menu/SearchBox';

const InProgress = () => {
  const { getAppliedBounties } = useBackend();
  
  const [bounties, setBounties] = useState([]);

  const [isSearchShow, setShow] = useState(false);
  
  const searchbox = useRef(null);

  useEffect(() => {
    async function fetchBounties() {
      const appliedBounties = await getAppliedBounties();
      console.log('appliedBounties:', appliedBounties);
      setBounties(appliedBounties);
    }
    fetchBounties();
  }, []);


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
          <div className={`app-content ${isSearchShow ? 'blur-sm' : ''}`}>
            {IsSmMobile() ? (
              <InBountiesBody bounties={bounties} />
            ) : (
              <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                <InBountiesBody bounties={bounties} />
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
