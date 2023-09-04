import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';

import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import { numberWithCommas, IsSmMobile, fadeInUp, fadeIn, getUTCNow, getUTCDate, isEmpty } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import BountiesBody from './BountiesBody';

const ExploreBounty = () => {
  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader/>
        <Sidebar path="ExploreBounties" />
        <div className='app-container'>
          <div className='app-header xl:items-center sm:flex-col'>
            <Subheader path="ExploreBounties" />
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
              <div className='app-title'>
                <p className='text-[40px] sm:text-center text-white'>Explore Bounties</p>
                <p className='text-[16px] app-gray'><span className='app-color'>3</span> Results </p>
              </div>
            </Reveal>
            <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
              <div className='flex gap-4 items-center'>
                <div className='input-form-control'>
                  <div className="input-control rounded-3xl">
                    <i class="fa fa-search"></i>
                    <input type="text" className='input-main border-r mx-3' placeholder='Search'></input>
                    <select type="checkbox" className="input-suffix selection" onClick={() => {}}>
                      <option value="Topics" selected={true}>Topics</option>
                      <option value="Tokens" >Tokens</option>
                    </select>
                  </div>
                </div>                
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
}
export default ExploreBounty;