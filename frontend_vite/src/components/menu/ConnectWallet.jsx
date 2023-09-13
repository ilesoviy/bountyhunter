import { useEffect } from 'react';
import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';
import { useCustomWallet } from '../../context/WalletContext'
import { isEmpty, shortenAddress } from '../../utils';

const ConnectWallet = () => {
  const { connectWallet, disconnectWallet, walletAddress } = useCustomWallet();

  return (
    <div className='connect-wallet'>
      {isEmpty(walletAddress) ? (<button className='btn-main2' onClick={connectWallet}>Connect Wallet</button>) 
        : (
            <div className="flex items-center btn-main !px-[20px] !py-[10px]">
              <img alt='' className='w-5 h-5 text-white mr-2' src={'/images/icons/wallet.png'} />
              <span className="text-[14px]" onClick={disconnectWallet}>
                {shortenAddress(walletAddress)}
              </span>
            </div>
          )}
    </div>
  );
}

export default ConnectWallet;
