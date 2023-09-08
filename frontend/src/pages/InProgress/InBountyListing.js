import React, { useState, useCallback, useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { IsSmMobile, fadeInUp } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import { Link } from '@reach/router';
import { Drawer } from './Drawer';
import HelpButton from '../../components/menu/HelpButton';
import Scrollbars from 'react-custom-scrollbars';
import Subheader from '../../components/menu/SubHeader';
import { Information } from '../../components/Information';
import { ListingDescription } from '../../components/ListingDescription';
import { Participants } from '../../components/Participants';
import WarningMsg from '../../components/WarningMsg';

const InBountyListingBody = ({ callback }) => {

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
          <div className='w-full my-2 py-3'>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2' onClick={() => { callback() }}>Submit Work</button>
          </div>
            </div>
          </div>
        </div> :
        <div className='flex flex-col'>
          <ListingDescription/>
          <Information />
          <Participants />
          <div className='w-full my-2 py-3'>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2' onClick={() => { callback() }}>Submit Work</button>
          </div>
        </div>}
      <HelpButton />
    </div>
  )

}

const InBountyListing = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => setDrawerOpen(true), []);
  const handleDrawerClose = useCallback(() => setDrawerOpen(false), []);


  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [gitHub, setGescHub] = useState('');

  const handleTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleDesc = useCallback((event) => {
    setDesc(event.target.value);
  }, []);

  const handleGitHub = useCallback((event) => {
    setGescHub(event.target.value);
  }, []);

  const onApplyClicked = useCallback((event) => {

  }, []);

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Subheader />
          <Link to="/InProgress">
            <div className='flex gap-3'>
              <span className="text-xl"><i className='fa fa-arrow-left'></i></span>
              <span className='text-xl'>Back</span>
            </div>
          </Link>
          <div className='app-header px-0 sm:flex-col'>
            <div className='app-title'>
              <p className='text-[40px] sm:text-center text-white pt-3'>Bounty Listing</p>
            </div>
          </div>
          {IsSmMobile() ? (
            <InBountyListingBody callback={handleDrawerOpen} />
          ) : (
            <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <InBountyListingBody callback={handleDrawerOpen} />
            </Scrollbars>
          )}
        </div>
      </div>
      <HelpButton />
      <Drawer anchor="right" className="w-full" open={drawerOpen} onClose={handleDrawerClose}>
        <button onClick={handleDrawerClose}>
          <div className='flex gap-3'>
            <span className="text-xl"><i className='fa fa-arrow-left'></i></span>
            <span className='text-xl'>Back</span>
          </div>
        </button>
        <WarningMsg msg='You need to connect your wallet in order to create a bounty.'/>
        <div className="mt-3 text-[20px] font-bold">
          <span>Bounty Listing / Submit Work</span>
        </div>
        <div className='input-form-control mt-3'>
          <label className='input-label'>Title</label>
          <div className="input-control">
            <input type="text" name="title" value={title} className='input-main' onChange={handleTitle}></input>
          </div>
        </div>
        <div className='input-form-control mt-3'>
          <label className='input-label'>Description</label>
          <div className="input-control h-[70px]">
            <textarea type="text" name="desc" value={desc} className='input-main' onChange={handleDesc}></textarea>
          </div>
        </div>
        <div className='input-form-control mt-3'>
          <label className='input-label'>Github Link</label>
          <div className="input-control">
            <input type="text" name="title" value={gitHub} className='input-main' onChange={handleGitHub}></input>
          </div>
        </div>
        <div className='input-form-control mt-3'>
          <div className="input-control w-1/2">
            <button className='input-main' onClick={onApplyClicked}>Submit Work</button></div>
        </div>
      </Drawer>
    </div>
  )
}

export default InBountyListing;