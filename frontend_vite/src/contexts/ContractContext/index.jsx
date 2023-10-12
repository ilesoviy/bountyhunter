import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobal } from '../GlobalContext';
import { useCustomWallet } from '../WalletContext';
import * as BountyHunter from 'bountyhunter';
import * as SorobanClient from 'soroban-client';


export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const { chainId } = useGlobal();
    const network = useSelector(state => state.network);
    const { walletAddress } = useCustomWallet();
    
    const dispatch = useDispatch();

    const [reloadCounter, setReloadCounter] = useState(0);

    const CONTRACT_ID = BountyHunter.networks.futurenet.contractId;
    const DEF_PAY_TOKEN = 'CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT';

    const contract = new SorobanClient.Contract(CONTRACT_ID);
    const server = new SorobanClient.Server(network.rpcUrl);

    useEffect(() => {
        let ac = new AbortController();

        const reload = () => {
            setReloadCounter((t) => {
                return t + 1
            });
        }

        let tmr = setInterval(() => {
            if (ac.signal.aborted === false) {
                reload();
            }
        }, 50000);

        return () => {
            ac.abort();
            clearInterval(tmr);
        }
    }, []);

    useEffect(() => {
        setReloadCounter((t) => {
            return t + 1;
        });
    }, [walletAddress]);

    const refreshPages = () => {
        setTimeout(() => {
            setReloadCounter((t) => {
                return t + 1;
            });
        }, 2000);
    };

    async function executeTransaction(operation, baseFee) {

        const pubKey = await walletObj.getUserInfo();
        // console.log('pubKey:', pubKey);

        const sourceAcc = await server.getAccount(pubKey);

        const transaction0 = new SorobanClient.TransactionBuilder(sourceAcc, {
            fee: (baseFee === undefined || baseFee === '') ? SorobanClient.BASE_FEE : baseFee,
            networkPassphrase: SorobanClient.Networks.FUTURENET,
        })
            .addOperation(operation)
            .setTimeout(30)
            .build();

        const simulated = await server.simulateTransaction(transaction0);
        if (SorobanClient.SorobanRpc.isSimulationError(simulated)) {
            throw new Error(simulated.error);
        }
        // console.log('simulated:', simulated);
        // console.log('latestLedger:', simulated.latestLedger);
        // console.log('retval:', simulated.result.retval);

        const transaction = await server.prepareTransaction(transaction0);
        const txXDR = transaction.toXDR();
        // console.log('txXDR:', txXDR);
        const {signedXDR} = await walletObj.signTransaction(txXDR, {
            network: 'FUTURENET',
            networkPassphrase: SorobanClient.Networks.FUTURENET,
            accountToSign: pubKey,
        });
        const txEnvelope = SorobanClient.xdr.TransactionEnvelope.fromXDR(signedXDR, 'base64');
        const tx = new SorobanClient.Transaction(txEnvelope, SorobanClient.Networks.FUTURENET);

        try {
            const response = await server.sendTransaction(tx);

            console.log('Sent! Transaction Hash:', response.hash);
            // Poll this until the status is not 'pending'
            if (response.status !== 'PENDING') {
                console.log('Transaction status:', response.status);
                // console.log(JSON.stringify(response));

                if (response.status === 'ERROR') {
                    return -1;
                }
            } else {
                let response2;

                do {
                    // Wait a second
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // See if the transaction is complete
                    response2 = await server.getTransaction(response.hash);
                } while (response2.status !== 'SUCCESS' && response2.status !== 'FAILED');

                console.log('Transaction2 status:', response2.status);
                // console.log(JSON.stringify(response2));

                if (response2.status === 'FAILED') {
                    return -1;
                }
            }
        } catch (e) {
            console.error('An error has occured:', e);
            return -1;
        }

        return 0;
    };

    const approveToken = async (from, spender, payAmount) => {
        const tokenContract = new SorobanClient.Contract(DEF_PAY_TOKEN);
        const res = await executeTransaction(
            tokenContract.call('approve', 
                new SorobanClient.Address(from).toScVal(), // from
                new SorobanClient.Address(spender).toScVal(), // spender
                SorobanClient.nativeToScVal(Number(payAmount * 2), { type: 'i128' }), // double payAmount for fee
                SorobanClient.xdr.ScVal.scvU32(535680 /* 34560 */) // expiration_ledger
            ),
        );

        console.log('res:', res);
        return res;
    };

    const createBounty = async (creator, name, reward, payToken, deadline) => {
        const res = await executeTransaction(
            contract.call('create_bounty', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvString(name), 
                SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(reward)), 
                new SorobanClient.Address(payToken).toScVal(), 
                SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(deadline)), 
                SorobanClient.xdr.ScVal.scvU32(400000)  // expiration_ledger
            ),
            '1000000'
        );

        // const res = await BountyHunter.invoke({
        //     method: 'create_bounty', 
        //     args: [
        //         new SorobanClient.Address(creator).toScVal(), 
        //         SorobanClient.xdr.ScVal.scvString(name), 
        //         SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(reward)), 
        //         new SorobanClient.Address(payToken).toScVal(), 
        //         SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(deadline)), 
        //         SorobanClient.xdr.ScVal.scvU32(400000)  // expiration_ledger
        //     ],
        //     fee: 100, // fee
        //     responseType: 'full', // responseType
        //     parseResultXdr: parseResultXdr, 
        //     secondsToWait: 10, // secondsToWait
        //     rpcUrl: chainId === 169 ? 'https://rpc-mainnet.stellar.org' : 'https://rpc-futurenet.stellar.org', // rpcUrl
        //     networkPassphrase: SorobanClient.Networks.FUTURENET, 
        //     contractId: BountyHunter.networks.futurenet.contractId, 
        //     wallet: walletObj
        // });

        // const contract3 = new BountyHunter.Contract({contractId: BountyHunter.networks.futurenet.contractId, 
        //     networkPassphrase: BountyHunter.networks.futurenet.networkPassphrase, 
        //     rpcUrl: chainId === 169 ? 'https://rpc-mainnet.stellar.org' : 'https://rpc-futurenet.stellar.org', 
        //     wallet: walletObj
        // });
        // const res = await contract3.createBounty({
        //     creator, 
        //     name, 
        //     reward, 
        //     pay_token: payToken, 
        //     deadline, 
        //     expiration_ledger: 400000
        // });

        console.log('res:', res);
        if (res)
            return res;

        return 0;
    };

    const applyBounty = async (participant, bountyId) => {
        const res = await executeTransaction(
            contract.call('apply_bounty', 
                new SorobanClient.Address(participant).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(bountyId)
            )
        );

        console.log('res:', res);
        if (res)
            return res;

        return 0;
    };

    const submitWork = async (participant, workId, workRepo) => {
        const res = await executeTransaction(
            contract.call('submit_work', 
                new SorobanClient.Address(participant).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(workId), 
                SorobanClient.xdr.ScVal.scvString(workRepo) // not necessary
            )
        );

        console.log('res:', res);
        return res;
    };

    const approveWork = async (creator, workId) => {
        const res = await executeTransaction(
            contract.call('approve_work', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(workId)
            )
        );

        console.log('res:', res);
        return res;
    };

    const rejectWork = async (creator, workId) => {
        const res = await executeTransaction(
            contract.call('reject_work', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(workId)
            )
        );

        console.log('res:', res);
        return res;
    };

    const cancelBounty = async (creator, bountyId) => {
        const res = await executeTransaction(
            contract.call('cancel_bounty', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(bountyId)
            )
        );

        console.log('res:', res);
        return res;
    };

    const closeBounty =  async (creator, bountyId) => {
        const res = await executeTransaction(
            contract.call('close_bounty', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(bountyId)
            )
        );

        console.log('res:', res);
        return res;
    };

    const tokenBalances = async (account, token) => {
        return await contract2.tokenBalances(account, token);
    };

    useEffect(() => {
        dispatch(updateChainId(networkConfig[chainId].chainId));
        dispatch(updateExplorerUrl(networkConfig[chainId].explorerUrl));
        dispatch(updateRpcUrl(networkConfig[chainId].rpcUrl));
    })

    return (
        <ContractContext.Provider value={{
            reloadCounter,
            refreshPages,

            CONTRACT_ID,
            DEF_PAY_TOKEN,
            
            approveToken,

            createBounty,
            applyBounty,
            cancelBounty,
            closeBounty,

            submitWork,
            approveWork,
            rejectWork,
            
            tokenBalances
        }}>
            {children}
        </ContractContext.Provider>
    );
}

export const useContract = () => {
    const contractManager = useContext(ContractContext);
    return contractManager || [{}];
}
