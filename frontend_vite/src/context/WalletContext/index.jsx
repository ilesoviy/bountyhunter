import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { StellarWalletsKit, WalletNetwork, WalletType } from "stellar-wallets-kit";
// import { Server, Networks } from "stellar-sdk";

import { useGlobal } from '../GlobalContext';

export const WalletContext = createContext();

export const WalletProvider = (props) => {
    const { chainId } = useGlobal();

    // const [server, setServer] = useState(
    //     new Server(chainId === 169 ? "https://horizon.stellar.org" : "https://horizon-futurenet.stellar.org")
    // );

    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");

    const kit = new StellarWalletsKit({
        network: WalletNetwork.FUTURENET,
        selectedWallet: WalletType.FREIGHTER,
    });

    const connectWallet = async () => {
        await kit.openModal({
            onWalletSelected: async (option) => {
                let _publicKey;

                if (option.type === WalletType.WALLET_CONNECT) {
                    try {
                        await kit.startWalletConnect({
                            name: 'BountyHunter',
                            description: 'BountyHunter WebApp',
                            url: "https://bounty.cryptosnowprince.com/",
                            icons: ["URL_OF_ICON"],
                            projectId: 'bountyhunter-c9d7d',
                        });

                        const sessions = await kit.getSessions();
                        if (sessions.length) {
                            await kit.setSession(sessions[0]?.id);
                        } else {
                            await kit.connectWalletConnect();
                        }

                        _pubicKey = await kit?.getWalletConnectPublicKey();
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    await kit.setWallet(option.type);
                    _publicKey = await kit.getPublicKey();
                }

                setWalletAddress(_publicKey);
                setIsConnected(true);
            },
        });
    }

    const disconnectWallet = async () => {
        // const sessions = await kit.getSessions();

        // console.log('session:', sessions)

        // if (sessions.length) {
        //     await kit.closeSession(sessions[0]?.id);
        // } else {
        //     console.log('Not connected!');
        // }
    }

    // useEffect(() => {
    //     let _publicKey = "";

    //     const syncWallet = async () => {
    //         if (selectedWallet === WalletType.WALLET_CONNECT) {
    //             try {
    //                 await kit.startWalletConnect({
    //                     name: "BountyHunter",
    //                     description: "BountyHunter WebApp",
    //                     url: "https://bounty.cryptosnowprince.com/",
    //                     icons: ["URL_OF_ICON"],
    //                     projectId: 'bountyhunter-c9d7d',
    //                 });

    //                 const sessions = await kit.getSessions();
    //                 if (sessions.length) {
    //                     await kit.setSession(sessions[0]?.id);
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //             _publicKey = await kit?.getWalletConnectPublicKey();
    //         } else {
    //             _publicKey = await kit.getPublicKey();
    //         }

    //         setAddress(_publicKey);
    //         setIsConnected(true);
    //     };

    //     if (selectedWallet) {
    //         syncWallet();
    //     }
    // }, [selectedWallet, network?.chainId]);

    // useEffect(() => {
    //     setServer(
    //         new Server(network.chainId === 169 ? "https://horizon.stellar.org" : "https://horizon-futurenet.stellar.org")
    //     );
    // }, [network?.chainId]);

    return (
        <WalletContext.Provider value={{ connectWallet, disconnectWallet, isConnected, walletAddress }}>
            {props.children}
        </WalletContext.Provider>
    );
}

export const useCustomWallet = () => {
    const dataManager = useContext(WalletContext);
    return dataManager || [{}];
}
