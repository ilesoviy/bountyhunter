import { useEffect } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { } from 'stylis-plugin-rtl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import ExploreBounty from './pages/ExploreBounties/ExploreBounty';
import NewBounty from './pages/NewBounty/NewBounty';
import MyBounties from './pages/MyBounties/MyBounties';
import ScrollToTopBtn from './components/menu/ScrollToTop';
import { SingingWeb3Provider } from './context/web3Context';
import Settings from './pages/App/Settings';
import ExBountyListing from './pages/ExploreBounties/BountyListing/ExBountyListing';
import PreviewNewBounty from './pages/NewBounty/PreviewNewBounty';
import InProgress from './pages/InProgress/InProgress';
import InBountyListing from './pages/InProgress/InBountyListing';

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
            <PreviewNewBounty path="NewBounty/preview" />
            <NewBounty path="NewBounty" />
            <ExBountyListing path="ExploreBounties/:id" />
            <InBountyListing path="InProgress/:id" />
            <ExploreBounty path="ExploreBounties" />            
            <InProgress path="InProgress" />
            <MyBounties path="MyBounties" />
            <Settings path="Settings" />
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
