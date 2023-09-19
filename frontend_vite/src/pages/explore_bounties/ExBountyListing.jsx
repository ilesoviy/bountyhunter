import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { IsSmMobile, fadeInUp } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import HelpButton from '../../components/menu/HelpButton';
import Subheader from '../../components/menu/SubHeader';
import { ListingDescription } from '../../components/ListingDescription';
import { Information } from '../../components/Information';
import { Participant } from '../../components/Participant';
import BackButton from '../../components/menu/BackButton';
import { useParams } from '@reach/router';
import { useCustomWallet } from '../../context/WalletContext';
import useBounty from '../../hooks/useBounty';
import useBackend from '../../hooks/useBackend';
import { toast } from 'react-toastify';

const ExBountyListingBody = ({bounty}) => {
  const { isConnected, walletAddress } = useCustomWallet();
  const { countWorks, applyBounty, getLastError } = useBounty();
  const { addWork } = useBackend();
  
  const onClickApply = useCallback(async (event) => {
    if (!isConnected) {
      toast.warning('Wallet not connected yet!');
      return;
    }

    const workIdOld = await countWorks();
    const workIdNew = await applyBounty(walletAddress, bounty?.bountyId);
    if (workIdNew < 0 || workIdOld === workIdNew) {
      const error = await getLastError();
      toast.error('Failed to apply to bounty!');
      console.error('error:', error);
      return;
    }

    const res = await addWork(walletAddress, bounty?.bountyId, workIdOld);
    if (res) {
      toast.error('Failed to add work!');
      return;
    }

    toast('Successfully added work!');
  }, [isConnected, walletAddress, bounty]);
  
  return (
    <div className='app-content pb-0 pr-4'>
      {!IsSmMobile() ?
        <div className='flex gap-3'>
          <div className='col-lg-7 pt-7'>
            <ListingDescription bounty={bounty} />
            <Participant bountyId={bounty.bountyId} />
          </div>
          <div className='col-lg-5'>
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
              <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover' onClick={onClickApply}>Apply</button>
            </div>
          </div>
        </div> :
        <div className='flex flex-col'>
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
          <Participant bountyId={bounty.bountyId} />
          <div className='w-full my-2 py-3'>
            <button className='text-[18px] w-full border rounded-2xl px-2 py-2 btn-hover' onClick={onClickApply}>Apply</button>
          </div>
        </div>}
      <HelpButton />
    </div>
  );
}

const ExBountyListing = () => {
  const { getSingleBounty } = useBackend();
  const { id: bountyId } = useParams();
  const [bounty, setBounty] = useState({});
  
  useEffect(() => {
    async function fetchBounty(bountyId) {
      const singleBounty = await getSingleBounty(bountyId);
      setBounty(singleBounty);
    }

    fetchBounty(bountyId);
  }, [bountyId]);

  return (
    <div className='full-container'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Subheader />
          <BackButton to="/ExploreBounties" />
          <div className='app-header px-0 xsm:items-start xl:items-center xsm:flex-col'>
            <div className='app-title'>
              <p className='text-[40px] sm:text-center text-white pt-3'>{bounty?.title}</p>
            </div>
          </div>
          {IsSmMobile() ? (
            <ExBountyListingBody bounty={bounty} />
          ) : (
            <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <ExBountyListingBody bounty={bounty} />
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExBountyListing;
