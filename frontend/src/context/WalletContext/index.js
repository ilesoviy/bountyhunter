import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { StellarWalletsKit, WalletNetwork, WalletType } from "stellar-wallets-kit";
import { Server, Networks } from "stellar-sdk";

import { useGlobal } from '../GlobalContext';

export const WalletContext = createContext();

export const WalletProvider = (props) => {
    const { chainId } = useGlobal();

    const [server, setServer] = useState(
        new Server(chainId === 169 ? "https://horizon.stellar.org" : "https://horizon-futurenet.stellar.org")
    );

    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState("");

    const kit = new StellarWalletsKit({
        network: WalletNetwork.PUBLIC,
        selectedWallet: WalletType.FREIGHTER,
    });

    const connect = async () => {
        await kit.openModal({
            onWalletSelected: async (option) => {
                let _publicKey;

                if (option.type === WalletType.WALLET_CONNECT) {
                    try {
                        await kit.startWalletConnect({
                            name: 'BountyHunter',
                            description: 'BountyHunter WebApp',
                            url: "https://bountyhunter-c9d7d.web.app/",
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

                setAddress(_publicKey);
                setIsConnected(true);
            },
        });
    }

    useEffect(() => {
        let _publicKey = "";

        const syncWallet = async () => {
            if (selectedWallet === WalletType.WALLET_CONNECT) {
                try {
                    await kit.startWalletConnect({
                        name: "BountyHunter",
                        description: "BountyHunter WebApp",
                        url: "https://bountyhunter-c9d7d.web.app/",
                        icons: ["URL_OF_ICON"],
                        projectId: 'bountyhunter-c9d7d',
                    });

                    const sessions = await kit.getSessions();
                    if (sessions.length) {
                        await kit.setSession(sessions[0]?.id);
                    }
                } catch (error) {
                    console.error(error);
                }
                _publicKey = await kit?.getWalletConnectPublicKey();
            } else {
                _publicKey = await kit.getPublicKey();
            }

            setAddress(_publicKey);
            setIsConnected(true);
        };

        if (selectedWallet) {
            syncWallet();
        }
    }, [selectedWallet, network?.chainId]);

    useEffect(() => {
        setServer(
            new Server(network.chainId === 169 ? "https://horizon.stellar.org" : "https://horizon-futurenet.stellar.org")
        );
    }, [network?.chainId]);

    return (
        <WalletContext.Provider value={{ connect, isConnected, address }}>
            {props.children}
        </WalletContext.Provider>
    )
}

export const useCustomWallet = () => {
    const dataManager = useContext(WalletContext)
    return dataManager || [{}]
}
