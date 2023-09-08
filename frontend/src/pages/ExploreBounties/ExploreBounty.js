import React, { useState, useCallback, useEffect, createRef, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Reveal } from 'react-awesome-reveal';

import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import { numberWithCommas, IsSmMobile, fadeInUp, fadeIn, getUTCNow, getUTCDate, isEmpty } from '../../utils';
import MainHeader from '../../components/menu/MainHeader';
import ExBountiesBody from './ExBountiesBody';
import HelpButton from '../../components/menu/HelpButton';
import SearchBox from '../../components/menu/SearchBox';

const ExploreBounty = () => {

  const [keyword, setKeyword] = useState('');
  
  const [isSearchShow, setSearchShow] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isCompe, setComp] = useState(false);
  const [isCoop, setCoop] = useState(false);
  const [isHack, setHack] = useState(false);
  const [isBegin, setBegin] = useState(false);
  const [isInter, setInter] = useState(false);
  const [isAdvan, setAdvan] = useState(false);
  const [isDesig, setDesig] = useState(false);
  const [isDevel, setDevel] = useState(false);
  const [isSmtCt, setSmtCt] = useState(false);
  const [isData, setData] = useState(false);
  const [isAI, setAI] = useState(false);

  const handleClosed = useCallback( () => {
     setClosed(isClosed=>!isClosed);
  }, []);
  const handleActive = useCallback( () => {
    setActive(isActive=>!isActive);
  }, []);
  const handleComp = useCallback( () => {
    setComp(isCompe=>!isCompe);
  }, []);
  const handleCoop = useCallback( () => {
    setCoop(isCoop=>!isCoop);
  }, []);
  const handleHack = useCallback( () => {
    setHack(isHack=>!isHack);
  }, []);
  const handleBegin = useCallback( () => {
    setBegin(isBegin=>!isBegin);
  }, []);
  const handleInter = useCallback( () => {
    setInter(isInter=>!isInter);
  }, []);
  const handleAdvan = useCallback( () => {
    setAdvan(isAdvan=>!isAdvan);
  }, []);
  const handleDesig = useCallback( () => {
    setDesig(isDesig=>!isDesig);
  }, []);
  const handleDevel = useCallback( () => {
    setDevel(isDevel=>!isDevel);
  }, []);
  const handleSmtCt = useCallback( () => {
    setSmtCt(isSmtCt=>!isSmtCt);
  }, []);
  const handleData = useCallback( () => {
    setData(isData=>!isData);
  }, []);
  const handleAI = useCallback( () => {
    setAI(isAI=>!isAI);
  }, []);

  const handleSearchShow = useCallback(() => {
    setSearchShow(isSearchShow=>!isSearchShow);

  }, []);

  const handleKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, []);

  const searchbox = useRef(null);
  // searchbox.current.get....

  return (
    <div className='full-container' >
      <div className='container'>
        <MainHeader />
        <Sidebar path="ExploreBounties" />
        <div className='app-container'>
          <Subheader path="ExploreBounties" />
          <div className='app-header items-center md:items-start sm:flex-col lg:pl-0 pl-[40px] pr-0 relative z-[99]'>
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
              <div className='app-title'>
                <p className='text-[40px] md:text-[24px] text-white'>Explore Bounties</p>
                <p className='text-[16px] app-gray'><span className='app-color'>3</span> Results </p>
              </div>
            </Reveal>

            {/* SearchBox start */}
            <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
              <div className='flex gap-4 items-center'>
                <div className='input-form-control relative z-50'>
                  <div className={`input-control rounded-3xl h-[60px] ${isSearchShow ? 'invisible' : ''}`}>
                    <i className="fa input-prefix fa-search"></i>
                    <input type="text" value={keyword} onChange={handleKeyword} className='input-main mx-3' placeholder='Search'></input>
                    <button className="input-suffix flex items-center gap-2 border-l-1" onClick={handleSearchShow}>
                      Filter<i className='fa fa-angle-down' />
                    </button>
                  </div>
                  {
                    isSearchShow &&
                    <div className='left-0 right-0 top-0 bottom-0 fixed z-0' onClick={() => setSearchShow(isSearchShow => false)}></div>
                  }
                  {isSearchShow &&
                    <section className='absolute right-0 top-0 left-0 rounded-3xl border-0 bg-[#00263e]'>
                      <div className="input-control h-[60px]  border-0">
                        <i className="fa fa-search input-prefix"></i>
                        <input type="text" value={keyword} onChange={handleKeyword} className='input-main border-r-1 mx-3' placeholder='Search'></input>
                        <button className="input-suffix flex items-center gap-2 border-l-1" onClick={handleSearchShow}>
                          <i className='fa fa-angle-up' />
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 p-4'>
                        <div className='font-bold'>Status</div>
                        <div className='flex gap-4 '>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleClosed} checked={isClosed} className=''></input><label>Closed</label></div>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleActive} checked={isActive} className=''></input><label>Active</label></div>
                        </div>
                        <div className='font-bold'>Type</div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleComp} checked={isCompe} className=''></input><label>Competitive</label></div>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleCoop}checked={isCoop} className=''></input><label>Cooperative</label></div>
                        </div>
                        <div className='font gap-2'>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleHack} checked={isHack} className=''></input><label>Hackathon</label></div>
                        </div>
                        <div className='font-bold'>Difficulty</div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleBegin} checked={isBegin} className=''></input><label>Beginner</label></div>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleInter} checked={isInter} className=''></input><label>Intermediate</label></div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleAdvan} checked={isAdvan} className=''></input><label>Advanced</label></div>
                        </div>
                        <div className='font-bold'>Topic</div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleDesig} checked={isDesig} className=''></input><label>Design</label></div>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleDevel} checked={isDevel} className=''></input><label>Development</label></div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleSmtCt} checked={isSmtCt} className=''></input><label>Smart Contracts</label></div>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleData} checked={isData} className=''></input><label>Data</label></div>
                          <div className='flex gap-1'><input type='checkbox' onChange={handleAI} checked={isAI} className=''></input><label>AI</label></div>
                        </div>
                      </div>
                    </section>}
                </div>
              </div>
            </Reveal>
            {/* SearchBox end */}
            {/* <SearchBox ref={searchbox}/> */}

            
          </div>
          <div className={`app-content ${isSearchShow ? 'blur-sm' : ''}`}>
            {IsSmMobile() ? (
              <ExBountiesBody />
            ) : (
              <Scrollbars id='body-scroll-bar' autoHide style={{ height: "100%" }}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} className={'thumb-horizontal'} />
                }>
                <ExBountiesBody />
              </Scrollbars>
            )}
          </div>
        </div>
      </div>
      <HelpButton/>
    </div>
  )
}
export default ExploreBounty;