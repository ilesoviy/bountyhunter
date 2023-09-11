import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import { IsSmMobile, fadeInUp } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import { Link } from '@reach/router';
import MyBountiesReviewItem from './MyBountiesReviewItem';
import HelpButton from '../../components/menu/HelpButton';
import Subheader from '../../components/menu/SubHeader';
import { Information } from '../../components/Information';
import { ListingDescription } from '../../components/ListingDescription';
import BackButton from '../../components/menu/BackButton';

const MyBountiesListingBody = () => {
  return (
    <div className='app-content pr-4'>
      {!IsSmMobile() ?
        <div className='flex gap-3'>
          <div className='col-lg-7 px-0 pt-0'>
            <ListingDescription />
            <div className='flex flex-col gap-3 mt-3'>
              <MyBountiesReviewItem />
              <MyBountiesReviewItem />
            </div>
          </div>
          <div className='col-lg-5 py-2 md:pl-7'>
            <Information />
            <div className='w-full my-2 py-3'>
              <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover' >Cancel</button>
            </div>
          </div>
        </div> :
        <div className='flex flex-col gap-3'>
          <ListingDescription />
          <Information />
          <MyBountiesReviewItem />
          <MyBountiesReviewItem />
            <div className='w-full my-2 py-3'>
              <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover' >Cancel</button>
            </div>
        </div>}
    </div>
  )
}

const MyBountiesListing = () => {

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Subheader />
          <BackButton to="/MyBounties" />
          <div className='app-header px-0 xl:items-center sm:flex-col'>
            <div className='app-title'>
              <p className='text-[40px] sm:text-center text-white pt-3'>Bounty Listing</p>
            </div>
          </div>
          {IsSmMobile() ? (
            <MyBountiesListingBody />
          ) : (
            <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <MyBountiesListingBody />
            </Scrollbars>
          )}
        </div>
      </div>
      <HelpButton />
    </div>
  );
}

export default MyBountiesListing;
