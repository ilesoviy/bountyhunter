import { useEffect } from 'react';
import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';
import { isEmpty } from '../../utils';

const ConnectWallet = () => {

  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWallet: WalletType.XBULL
  });

  async function handleConnect() {
    await kit.openModal({
      onWalletSelected: async (option) => {
        kit.setWallet(option.type);
        const publicKey = await kit.getPublicKey();
        // Do something else

        console.log("publicKey", publicKey);
      }
    });
  }

  return (
    <div className='connect-wallet'>
      {/* isEmpty(walletAddress) ? ( */
        <button className='btn-main2' onClick={handleConnect}>Connect Wallet</button>
          /* ) : (
            <div className="flex items-center btn-main !px-[20px] !py-[10px]">
              <img alt='' className='w-5 h-5 text-white mr-2' src={'/images/icons/wallet.png'} />
              <span className="text-[14px]" onClick={handleDisconnect}>{walletAddress.slice(0, 4) + "..." + walletAddress.slice(38)}</span>
            </div>
          ) */}
    </div>
  );
}

export default ConnectWallet;
