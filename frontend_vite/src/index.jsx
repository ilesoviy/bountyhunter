import React from 'react';
import ReactDOM from 'react-dom/client';
// import { GlobalProvider } from './context/GlobalContext';
// import { WalletProvider } from './context/WalletContext';
// import { ContractProvider } from './context/ContractContext';
import { LocationProvider } from '@reach/router';
import App from './App.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './index.css';
import './style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <GlobalProvider>
  //   <WalletProvider>
  //     <ContractProvider>
        <LocationProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </LocationProvider>
  //     </ContractProvider>
  //   </WalletProvider>
  // </GlobalProvider>
);
