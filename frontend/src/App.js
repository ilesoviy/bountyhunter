import { useEffect } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { } from 'stylis-plugin-rtl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import ExploreBounty from './pages/ExploreBounties/ExploreBounty';
import NewBounty from './pages/NewBounty/NewBounty';
import MyBounties from './pages/MyBounties/MyBounties';
import Review from './pages/App/Review';
import ScrollToTopBtn from './components/menu/ScrollToTop';
import { SingingWeb3Provider } from './context/web3Context';
import Settings from './pages/App/Settings';
import BountyListing from './pages/ExploreBounties/BountyListing/BountyListing';
import PreviewNewBounty from './pages/NewBounty/PreviewNewBounty';

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

export const ScrollTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

function App() {
  return (
    <div className='app'>
      <SingingWeb3Provider>
        <PosedRouter>
          <ScrollTop path="/">
            <Home exact path="/">
              <Redirect to="/" />
            </Home>
            <BountyListing path="ExploreBounties/:id"/>
            <ExploreBounty path="ExploreBounties" />
            <PreviewNewBounty path="NewBounty/preview" />
            <NewBounty path="NewBounty" />
            <MyBounties path="MyBounties" />
            <Review path="Review" />
            <Settings path="Settings"/>
          </ScrollTop>
        </PosedRouter>
      </SingingWeb3Provider>
      <ScrollToTopBtn />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
