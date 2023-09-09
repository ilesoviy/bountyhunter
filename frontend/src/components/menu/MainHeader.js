import React, { useEffect } from "react";
import { Link } from '@reach/router';
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { useScrollSection } from "react-scroll-section";
import Popover from '@mui/material/Popover';
import { IsMobile } from '../../utils';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp, fadeIn, IsSmMobile, numberWithCommas } from '../../utils';
import ConnectWallet from '../../components/menu/ConnectWallet';

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const MainHeader = function () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <header id="myHeader" className='navbar white'>
      <div className='container h-full'>
        <div className='row w-100-nav relative'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/logo/logo.png"
                    className="img-fluid"
                    alt="#"
                  />
                  Bounty Hunter
                </div>
              </NavLink>
            </div>
          </div>
          <BreakpointProvider>
            <Breakpoint l down>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}>
              </Popover>
            </Breakpoint>

            <Breakpoint xl>
            </Breakpoint>
          </BreakpointProvider>

          <div className='mainside lg:hidden'>
            {/* <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce> */}
            <ConnectWallet />
            {/* </Reveal> */}
          </div>
        </div>
      </div>
    </header >
  );
}

export default MainHeader;