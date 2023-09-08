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

const MyBountiesListingBody = () => {
  return (
    <div className='app-content pb-0 pr-4'>
      {!IsSmMobile() ?
        <div className='flex gap-3'>
          <div className='col-lg-7 px-0 pt-7'>
            <ListingDescription />
            <div className='flex flex-col gap-3 mt-4'>
              <MyBountiesReviewItem />
              <MyBountiesReviewItem />
            </div>
          </div>
          <div className='col-lg-5 py-2 md:pl-7'>
            <Information />
          </div>
        </div> :
        <div className='flex flex-col gap-3'>
          <ListingDescription />
          <Information />
          <MyBountiesReviewItem />
          <MyBountiesReviewItem />
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
          <Link to="/MyBounties">
            <div className='flex gap-2'>
              <span className="text-xl"><i className='fa fa-angle-left' /></span>
              <span className='text-xl'>Back</span>
            </div>
          </Link>
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
  )
}

export default MyBountiesListing;