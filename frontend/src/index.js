import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocationProvider } from '@reach/router';
import { GlobalProvider } from './context/GlobalContext';
import { WalletProvider } from './context/WalletContext';
import { ContractProvider } from './context/ContractContext';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './index.css';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
    <WalletProvider>
      <ContractProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </ContractProvider>
    </WalletProvider>
  </GlobalProvider>
);
