import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../../components/menu/SideBar';
import { Reveal } from 'react-awesome-reveal';
import { IsSmMobile, fadeInUp, fadeIn } from '../../utils';
import Subheader from '../../components/menu/SubHeader';
import MainHeader from '../../components/menu/MainHeader';
import BountiesBody from '../ExploreBounties/BountiesBody';

const MyBounties = () => (
  <div className='full-container'>
      <div className='container'>
        <MainHeader/>
        <Sidebar path="MyBounties" />
        <div className='app-container'>
          <div className='app-header xl:items-center sm:flex-col'>
            <Subheader path="MyBounties" />
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
              <div className='app-title'>
                <p className='text-[40px] sm:text-center text-white'>Working Bounties</p>
              </div>
            </Reveal>
          </div>
          <div className='app-content'>
            {IsSmMobile() ? (
              <BountiesBody />
            ) : (
              <Scrollbars autoHide style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                <BountiesBody />
              </Scrollbars>
            )}
          </div>
        </div>
      </div>      
    </div>
)
export default MyBounties;