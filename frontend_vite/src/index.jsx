import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocationProvider } from '@reach/router';
import { GlobalProvider } from './context/GlobalContext';
import { WalletProvider } from './context/WalletContext';
import { ContractProvider } from './context/ContractContext';
import App from './App.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './index.css';
import './style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocationProvider>
    <GlobalProvider>
      <WalletProvider>
        <ContractProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ContractProvider>
      </WalletProvider>
    </GlobalProvider>    
  </LocationProvider>
);
