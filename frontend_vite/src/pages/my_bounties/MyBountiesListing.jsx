import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';
import { IsSmMobile, fadeInUp } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import { Link, useParams } from '@reach/router';
import HelpButton from '../../components/menu/HelpButton';
import Subheader from '../../components/menu/SubHeader';
import { ListingDescription } from '../../components/ListingDescription';
import { Information } from '../../components/Information';
import MyBountiesReviewItem from './MyBountiesReviewItem';
import BackButton from '../../components/menu/BackButton';
import { useCustomWallet } from '../../context/WalletContext';
import useBounty,  { WorkStatus } from '../../hooks/useBounty';
import useBackend from '../../hooks/useBackend';
import { toast } from 'react-toastify';

const MyBountiesListingBody = ({bounty, works}) => {
  const { isConnected, walletAddress } = useCustomWallet();
  const { cancelBounty, getLastError } = useBounty();
  const { cancelBountyB } = useBackend();
  
  const onClickCancel = useCallback(async (event) => {
    if (!isConnected) {
      toast.warning('Wallet not connected yet!');
      return;
    }

    const res1 = await cancelBounty(walletAddress, bounty?.bountyId);
    if (res1) {
      const error = await getLastError();
      toast.error('Failed to cancel bounty!');
      console.error('error:', error);
      return;
    }

    const res2 = await cancelBountyB(walletAddress, bounty?.bountyId);
    if (res2) {
      toast.error('Failed to cancel bounty!');
      return;
    }

    toast('Successfully cancelled bounty!');
  }, [isConnected, walletAddress, bounty]);
  
  return (
    <div className='app-content pr-4'>
      {!IsSmMobile() ?
        <div className='flex gap-3'>
          <div className='col-lg-7 px-0 pt-0'>
            <ListingDescription bounty={bounty} />
            <div className='flex flex-col gap-3 mt-3'>
              {works?.map((item, idx) => {
                return (<MyBountiesReviewItem key={idx} work={item}/>)
              })}
            </div>
          </div>
          <div className='col-lg-5 py-2 md:pl-7'>
            <Information 
              wallet = {bounty?.creator?.wallet} 
              payAmount = {bounty?.payAmount} 
              type = {bounty?.type} 
              difficulty = {bounty?.difficulty} 
              topic = {bounty?.topic} 
              gitHub = {bounty?.gitHub} 
              startDate = {Date.parse(bounty?.startDate)} 
              endDate = {Date.parse(bounty?.endDate)}
              status = {bounty?.status}
          />
            <div className='w-full my-2 py-3'>
              <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover' onClick={onClickCancel}>Cancel</button>
            </div>
          </div>
        </div> :
        <div className='flex flex-col gap-3'>
          <ListingDescription bounty={bounty} />
          <Information 
              wallet = {bounty?.creator?.wallet} 
              payAmount = {bounty?.payAmount} 
              type = {bounty?.type} 
              difficulty = {bounty?.difficulty} 
              topic = {bounty?.topic} 
              gitHub = {bounty?.gitHub} 
              startDate = {Date.parse(bounty?.startDate)} 
              endDate = {Date.parse(bounty?.endDate)}
              status = {bounty?.status}
          />
          {works?.map((work, idx) => {
            return (<MyBountiesReviewItem key={idx} work={item}/>)
          })}
          <div className='w-full my-2 py-3'>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover' onClick={onClickCancel}>Cancel</button>
          </div>
        </div>}
    </div>
  );
}

const MyBountiesListing = () => {
  const { getSingleBounty, getWorks } = useBackend();
  const { id: bountyId } = useParams();
  const [bounty, setBounty] = useState({});
  const [works, setWorks] = useState([]);
  
  useEffect(() => {
    async function fetchBountyAndWorks(bountyId) {
      if (!bountyId) return;
      
      const singleBounty = await getSingleBounty(bountyId);
      setBounty(singleBounty);
 
      const submittedWorks = await getWorks(bountyId, WorkStatus.SUBMITTED);
      console.log('submittedWorks:', submittedWorks);
      setWorks(submittedWorks);
    }

    fetchBountyAndWorks(bountyId);
  }, [bountyId]);

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Subheader />
          <BackButton to="/MyBounties" />
          <div className='app-header px-0 xsm:items-start xl:items-center xsm:flex-col'>
            <div className='app-title'>
              <p className='text-[40px] sm:text-center text-white pt-3'>{bounty?.title}</p>
            </div>
          </div>
          {IsSmMobile() ? (
            <MyBountiesListingBody bounty={bounty} works={works} />
          ) : (
            <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <MyBountiesListingBody bounty={bounty} works={works} />
            </Scrollbars>
          )}
        </div>
      </div>
      <HelpButton />
    </div>
  );
}

export default MyBountiesListing;
