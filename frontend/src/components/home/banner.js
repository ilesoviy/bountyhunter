import React from 'react';
import Reveal from 'react-awesome-reveal';
import { Link } from '@reach/router';
import ColorGroup from './colorGroup';
import { fadeInUp, fadeIn, IsSmMobile } from '../../utils';
import { Scrollbars } from 'react-custom-scrollbars';

const BannerBody = () => (
  <div className='relative z-1'>
    <div className="row items-center py-[64px]">
      <div className="col-md-6 bg-[#0000005c] p-5 rounded-3xl">
        <ColorGroup />
        <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <h3 className="text-[64px] md:text-[50px] md:text-center font-semibold text-white"><span className="text-white banner-font-family">Find Bounties, Reap Rewards
          </span></h3>
        </Reveal>
        <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
          <h1 className="text-[20px] md:text-[16px] md:text-center gray mt-3 banner-font-family">Maximize your potential with Stellar Soroban in the world of bounties.</h1>
        </Reveal>
        <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
          <div className='mainside banner-font-family mt-4'>
            <Link to="/ExploreBounties">Explore</Link>
          </div>
        </Reveal>
        <div className="mb-sm-30"></div>
      </div>
    </div>
    <div className='container relative z-1 border-solid border-2 rounded-3xl bg-[#0000005c] p-5'>
      <div className='row'>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="feature-box f-boxed style-3">
            <img className='i-boxed w-[24px] h-[24px]' src="/images/icons/add.png" alt=""></img>
            <div className="text">
              <h4 className="font-bold text-2xl mt-2">Create Bounties</h4>
              <p className="mt-2">Kickstart your project by offering bounties.</p>
            </div>
            <i className="wm icon_wallet"></i>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="feature-box f-boxed style-3">
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <img className='i-boxed w-[24px] h-[24px]' src="/images/icons/participate.png" alt=""></img>
            </Reveal>
            <div className="text">
              <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                <h4 className="font-bold text-2xl mt-2">Participate</h4>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <p className=" mt-2">Join the community and cooperate.</p>
              </Reveal>
            </div>
            <i className="wm icon_cloud-upload_alt"></i>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="feature-box f-boxed style-3">
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <img className='i-boxed w-[24px] h-[24px]' src="/images/icons/build.png" alt=""></img>
            </Reveal>
            <div className="text">
              <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                <h4 className="font-bold text-2xl mt-2">Build</h4>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <p className=" mt-2">Complete tasks and contribute to web3 projects. </p>
              </Reveal>
            </div>
            <i className="wm icon_tags_alt"></i>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="feature-box f-boxed style-3">
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <img className='i-boxed w-[24px] h-[24px]' src="/images/icons/earn.png" alt=""></img>
            </Reveal>
            <div className="text">
              <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                <h4 className="font-bold text-2xl mt-2">Earn</h4>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <p className=" mt-2">Get rewarded in crypto for your valuable contributions. </p>
              </Reveal>
            </div>
            <i className="wm icon_tags_alt"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Banner = () => {
  return (
    <div className='relative h-full'>
      <div className="relative container h-full">
        <div className="absolute bottom-0 right-0">
          {/* <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce> */}
          <img className="h-[600px] logo" src="./images/banner/banner.png" alt="" />
          {/* </Reveal> */}
        </div>
        <div className='banner py-20 h-full'>
          <BannerBody />
        </div>
        <div className='fixed bottom-0 right-0'>
          <ColorGroup className="fixed bottom-0 right-0" />
        </div>
      </div>

    </div>
  )
};
export default Banner;