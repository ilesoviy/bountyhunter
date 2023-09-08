import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import { IsSmMobile, fadeInUp } from '../../../utils';
import MainHeader from '../../../components/menu/MainHeader';
import { Link } from '@reach/router';
import HelpButton from '../../../components/menu/HelpButton';
import Subheader from '../../../components/menu/SubHeader';
import { ListingDescription } from '../../../components/ListingDescription';
import { Information } from '../../../components/Information';
import { Participants } from '../../../components/Participants';

const ExBountyListingBody = () => {
  return (
    <div className='app-content pb-0 pr-4'>
      {!IsSmMobile() ?
        <div className='flex gap-3'>
          <div className='col-lg-7 pt-7'>
            <ListingDescription/>
            <Participants />
          </div>
          <div className='col-lg-5'>
            <Information />
            <div className='w-full my-2 py-3'>
              <button className='text-[18px] w-full border rounded-2xl px-2 py-2' >Apply</button>
            </div>
          </div>
        </div> :
        <div className='flex flex-col'>
          <ListingDescription/>
          <Information />
          <Participants />
          <div className='w-full my-2 py-3'>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2' >Apply</button>
          </div>
        </div>}
      <HelpButton />
    </div>
  )
}

const ExBountyListing = () => {

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Subheader />
          <Link to="/ExploreBounties">
            <div className='flex gap-3'>
              <span className="text-xl"><i className='fa fa-arrow-left'></i></span>
              <span className='text-xl'>Back</span>
            </div>
          </Link>
          <div className='app-header px-0 xsm:items-start xl:items-center xsm:flex-col'>
            <div className='app-title'>
              <p className='text-[40px] sm:text-center text-white pt-3'>Bounty Listing</p>
            </div>
          </div>
          {IsSmMobile() ? (
            <ExBountyListingBody />
          ) : (
            <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <ExBountyListingBody />
            </Scrollbars>
          )}
          {/* <ExBountyListingBody/> */}
        </div>
      </div>
    </div>
  )
}

export default ExBountyListing;