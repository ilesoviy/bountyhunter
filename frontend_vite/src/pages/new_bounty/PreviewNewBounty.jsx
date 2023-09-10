import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import Subheader from '../../components/menu/SubHeader';
import { numberWithCommas, IsSmMobile, fadeInUp, fadeIn, getUTCNow, getUTCDate, isEmpty } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import { Link } from '@reach/router';
import HelpButton from '../../components/menu/HelpButton';
import WarningMsg from '../../components/WarningMsg';
import { Information } from '../../components/Information';
import BackButton from '../../components/menu/BackButton';

const PreviewBody = () => {
  return (
    <div className='app-content'>
      <div className='row'>
        <div className='col-lg-7 pr-3 pt-7'>
          <div className='flex justify-between sm:items-center pt-2 pb-3'>
            <div className='flex flex-col'>
              <button className='text-[18px] border rounded-2xl px-4'>Active</button>
            </div>
            <div className='flex'>
              <button className='text-[18px] mr-2'><i class="fa-regular fa-arrow-up-from-square mr-2"></i>Share</button>
            </div>
          </div>
          <span className='py-2'>This is a preview from a bounty and contains the information written in the description.</span>
          <WarningMsg msg='You need to connect your wallet in order to create a bounty.' />
        </div>
        <div className='col-lg-5 py-2 md:pl-0'>
          {/* <div className='info-box pb-3'>
            <div className='info-header'>
              <div className='flex my-2 text-[24px]'><span>Information</span></div>
            </div>
            <div className='info-body'>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Published by:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>GAD...RARW</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center  px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Payment:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>1000 XLM</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center  px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Status</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>Active</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Start Date:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>January 1, 2024, 5:00 AM</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>End Date:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>January 1, 2024, 5:00 AM</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Block</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>#254121386</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Level:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>Beginner</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Topic:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>Vanilla Stellar</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Type:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px] '>Cooperative</span>
                </div>
              </div>
              <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                <div className='flex flex-col'>
                  <span className='text-[18px]'>Repository:</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[18px]'><i className='fa fa-send' /></span>
                </div>
              </div>
            </div>
          </div> */}
          <Information />
          <div className='w-full my-2 py-3'>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover'>Edit</button>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover mt-2'>Create Bounty</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const PreviewNewBounty = () => {
  return (
    <div className='full-container overflow-auto'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Subheader />
          <BackButton to="/NewBounty" />
          <div className='app-header px-0 xl:items-center xsm:items-start sm:flex-col'>
            <div className='app-title'>
              <p className='text-[40px] sm:text-center text-white pt-3'>Bounty Preview</p>
            </div>
          </div>
          {IsSmMobile() ? (
            <PreviewBody />
          ) : (
            <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <PreviewBody />
            </Scrollbars>
          )}
        </div>
      </div>
      <HelpButton />
    </div>
  );
}

export default PreviewNewBounty;