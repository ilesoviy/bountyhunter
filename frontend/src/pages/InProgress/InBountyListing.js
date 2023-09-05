import React, { useState, useCallback, useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import { Link } from '@reach/router';
import { Drawer } from './Drawer';

const InBountyListingBody = ({ callback }) => {

  return (
    <div className='app-content'>
      <div className='row'>
        <div className='col-md-7 px-0 pt-7'>
          <div className='flex justify-between sm:flex-col sm:text-center py-2'>
            <div className='flex flex-col'>
              <button className='text-[18px] border rounded-2xl px-4'>Active</button>
            </div>
            <div className='flex gap-1'>
              <button className='text-[18px]'><i className='fa fa-upload'></i>Share</button>
            </div>
          </div>
          <span className='pt-2 mb-6'>As a bounty hunter for the Soroban Contract Writing in Rust, you will be responsible for thoroughly testing our platform and identifying any potential security vulnerabilities or bugs. You will be tasked with conducting comprehensive penetration testing and code review to ensure that our platform is secure, reliable, and efficient.<br /> Successful candidates will have a strong understanding of Rust development, as well as experience working with blockchain technology and smart contract writing. You should be comfortable working with cryptographic algorithms, as well as developing and testing secure, reliable, and efficient.</span>
          <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
            <div className='info-box pb-3 mt-[40px]'>
              <div className='info-header'>
                <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                  <div className='flex flex-col'>
                    <div className='flex my-2 text-[24px]'><span>Participants</span></div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex my-2 text-[24px]'><span>Status</span></div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex my-2 text-[24px]'><span>Time</span></div>
                  </div>
                </div>
              </div>
              <div className='info-body'>
                {[1, 1, 1].map((v, i) => (
                  <div className='flex justify-between sm:flex-col sm:text-center px-3'>
                    <div className='flex flex-col'>
                      <div className='flex my-2 text-[16px]'><span>GS573KASDHK...AZEW (Worker 1)</span></div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex my-2 text-[16px]'><span>In Progress</span></div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex my-2 text-[16px]'><span>10 hours ago</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className='col-md-5 py-2 pl-7'>
          <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
            <div className='info-box pb-3'>
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
            </div>
          </Reveal>
          <div className='w-full my-2 py-3'>
            <button className='text-[24px] w-full border rounded-2xl px-2' onClick={() => { callback() }}>Submit Work</button>
          </div>
        </div>
      </div>
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
    <div className='full-container overflow-auto'>
      <div className='container'>
        <MainHeader />
        <div className='bounty-listing-container'>
          <Link to="/ExploreBounties">
            <div className='flex gap-3'>
              <span className="text-xl"><i className='fa fa-arrow-left'></i></span>
              <span className='text-xl'>Back</span>
            </div>
          </Link>
          <div className='app-header px-0 xl:items-center sm:flex-col'>
            <div className='app-title'>
              <Link to="/NewBounty"> <span></span> </Link>
              <p className='text-[40px] sm:text-center text-white pt-3'>Bounty Listing</p>
            </div>
          </div>
          <InBountyListingBody callback={handleDrawerOpen} />
        </div>
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <button onClick={handleDrawerClose}>
          <div className='flex gap-3'>
            <span className="text-xl"><i className='fa fa-arrow-left'></i></span>
            <span className='text-xl'>Back</span>
          </div>
        </button>
        <div className='w-full bg-[#0092DC] mt-3 rounded-xl p-3'>
          <div className='flex gap-3'>
            <span className="text-xl"><i className='fa fa-exclamation-circle'></i></span>
            <div className='flex flex-col'>
              <p className='text-[17px] sm:text-[15px]'>You need to connect your wallet in order to create a bounty.</p>
              <span className='font-bold'>Learn More</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <span>Bounty Listing / Apply</span>
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
          <div className="input-control w-1/3">
            <button className='input-main' onClick={onApplyClicked}>Submit Work</button></div>
        </div>
      </Drawer>
    </div>
  )
}

export default InBountyListing;