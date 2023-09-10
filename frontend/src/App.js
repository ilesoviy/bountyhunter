import { useEffect } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { } from 'stylis-plugin-rtl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import ExploreBounty from './pages/ExploreBounties';
import NewBounty from './pages/NewBounty';
import MyBounties from './pages/MyBounties';
import ScrollToTopBtn from './components/menu/ScrollToTop';
import Settings from './pages/Settings/';
import ExBountyListing from './pages/ExploreBounties/BountyListing/ExBountyListing';
import PreviewNewBounty from './pages/NewBounty/PreviewNewBounty';
import InProgress from './pages/InProgress';
import InBountyListing from './pages/InProgress/InBountyListing';
import MyBountiesListing from './pages/MyBounties/MyBountiesListing';

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
      <PosedRouter>
        <ScrollTop path="/">
          <Home exact path="/">
            <Redirect to="/" />
          </Home>
          <NewBounty path="NewBounty" />
          <PreviewNewBounty path="NewBounty/preview" />
          <ExploreBounty path="ExploreBounties" />
          <ExBountyListing path="ExploreBounties/:id" />
          <InProgress path="InProgress" />
          <InBountyListing path="InProgress/:id" />
          <MyBounties path="MyBounties" />
          <MyBountiesListing path="MyBounties/:id" />
          <Settings path="Settings" />
        </ScrollTop>
      </PosedRouter>
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
