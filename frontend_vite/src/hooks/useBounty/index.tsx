import { useEffect } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
import { useCustomWallet } from '../../contexts/WalletContext';
import * as BountyHunter from '../../../bountyhunter_module';
import * as SorobanClient from 'soroban-client';


export const CONTRACT_ID = BountyHunter.networks.futurenet.contractId;

export enum BountyStatus {
    INIT = BountyHunter.BountyStatus.INIT,
    ACTIVE = BountyHunter.BountyStatus.ACTIVE,
    CANCELLED = BountyHunter.BountyStatus.CANCELLED,
    COMPLETE = BountyHunter.BountyStatus.COMPLETE,
    CLOSED = BountyHunter.BountyStatus.CLOSED
}

export enum WorkStatus {
    INIT = BountyHunter.WorkStatus.INIT,
    APPLIED = BountyHunter.WorkStatus.APPLIED,
    SUBMITTED = BountyHunter.WorkStatus.SUBMITTED,
    APPROVED = BountyHunter.WorkStatus.APPROVED,
    REJECTED = BountyHunter.WorkStatus.REJECTED
}


const useBounty = () => {
    const { chainId } = useGlobal();
    const { walletObj } = useCustomWallet();

    const DEF_PAY_TOKEN = 'CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT';

    useEffect(() => {
    }, []);

    const contract = new SorobanClient.Contract(CONTRACT_ID);
    const contract2 = new BountyHunter.Contract({contractId: CONTRACT_ID, 
        networkPassphrase: BountyHunter.networks.futurenet.networkPassphrase, 
        rpcUrl: chainId === 169 ? 'https://rpc-mainnet.stellar.org' : 'https://rpc-futurenet.stellar.org', 
        wallet: walletObj
    });

    const server = new SorobanClient.Server(
        chainId === 169 ? 'https://rpc-mainnet.stellar.org' : 'https://rpc-futurenet.stellar.org'
    );

    function parseResultXdr(xdr): [number, number] {
        console.log('xdr:', xdr);
        if ('resultXdr' in xdr) {
            console.log('value:', xdr.returnValue._value);
            return [xdr.returnValue._value, xdr.ledger];
        }

        return [-5, 0];
    }

    async function executeTransaction(operation: SorobanClient.xdr.Operation, baseFee?: string): Promise<[number, number]> {

        const pubKey = await walletObj.getUserInfo();
        // console.log('pubKey:', pubKey);

        const sourceAcc = await server.getAccount(pubKey);

        const transaction0 = new SorobanClient.TransactionBuilder(sourceAcc, {
            fee: (baseFee === undefined || baseFee === '') ? SorobanClient.BASE_FEE : baseFee,
            networkPassphrase: SorobanClient.Networks.FUTURENET,
        })
            .addOperation(operation)
            .setTimeout(SorobanClient.TimeoutInfinite /* 30 */)
            .build();

        const simulated = await server.simulateTransaction(transaction0);
        // console.log('simulated:', simulated);
        if (SorobanClient.SorobanRpc.isSimulationError(simulated)) {
            console.error(simulated.error);
            return [-1, 0];
        }

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
                // console.log('response:', response);
                if (response.status === 'ERROR') {
                    return [-2, 0];
                }
                return parseResultXdr(response);
            } else {
                let response2;

                do {
                    // Wait a second
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // See if the transaction is complete
                    response2 = await server.getTransaction(response.hash);
                } while (response2.status !== 'SUCCESS' && response2.status !== 'FAILED');

                console.log('Transaction2 status:', response2.status);
                // console.log('response2:', response2);
                if (response2.status === 'FAILED') {
                    return [-3, 0];
                }
                return parseResultXdr(response2);
            }
        } catch (e) {
            console.error('An error has occured:', e);
            return [-4, 0];
        }

        return [0, 0];
    }

    const approveToken = async (from, spender, payAmount) => {
        const tokenContract = new SorobanClient.Contract(DEF_PAY_TOKEN);
        const res = await executeTransaction(
            tokenContract.call('approve', 
                new SorobanClient.Address(from).toScVal(), // from
                new SorobanClient.Address(spender).toScVal(), // spender
                SorobanClient.nativeToScVal(Number(payAmount * 2), { type: 'i128' }), // double payAmount for fee
                SorobanClient.xdr.ScVal.scvU32(535680) // expiration_ledger
            ),
        );

        console.log('res:', res);
        return res[0];
    };

    const receiveEvent = async() => {
        let requestObject = {
            'jsonrpc': '2.0',
            'id': 8675309,
            'method': 'getEvents',
            'params': {
              'startLedger': '227000',
              'filters': [
                {
                  'type': 'contract',
                  'contractIds': [
                    CONTRACT_ID
                  ],
                  'topics': [
                    [
                      'AAAABQAAAAh0cmFuc2Zlcg==',
                      '*',
                      '*'
                    ]
                  ]
                }
              ],
              'pagination': {
                'limit': 100
              }
            }
        };

        let res = await fetch('https://soroban-futurenet.stellar.org', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestObject),
        });
        let json = await res.json()
        console.log(json)
    };

    const createBounty = async (creator, name, reward, payToken, deadline) => {
        const res = await executeTransaction(
            contract.call('create_bounty', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvString(name), 
                SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(reward)), 
                new SorobanClient.Address(payToken).toScVal(), 
                SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(deadline))
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
        //         SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(deadline))
        //     ],
        //     fee: 100, // fee
        //     responseType: 'full', // responseType
        //     parseResultXdr: parseResultXdr, 
        //     secondsToWait: 10, // secondsToWait
        //     rpcUrl: chainId === 169 ? 'https://rpc-mainnet.stellar.org' : 'https://rpc-futurenet.stellar.org', // rpcUrl
        //     networkPassphrase: SorobanClient.Networks.FUTURENET, 
        //     contractId: CONTRACT_ID, 
        //     wallet: walletObj
        // });

        // const contract3 = new BountyHunter.Contract({contractId: CONTRACT_ID, 
        //     networkPassphrase: BountyHunter.networks.futurenet.networkPassphrase, 
        //     rpcUrl: chainId === 169 ? 'https://rpc-mainnet.stellar.org' : 'https://rpc-futurenet.stellar.org', 
        //     wallet: walletObj
        // });
        // const res = await contract3.createBounty({
        //     creator, 
        //     name, 
        //     reward, 
        //     pay_token: payToken, 
        //     deadline
        // });

        console.log('res:', res);
        return res;
    }

    const applyBounty = async (participant, bountyId) => {
        const res = await executeTransaction(
            contract.call('apply_bounty', 
                new SorobanClient.Address(participant).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(bountyId)
            )
        );

        console.log('res:', res);
        return res[0];
    };

    const submitWork = async (participant, workId) => {
        const res = await executeTransaction(
            contract.call('submit_work', 
                new SorobanClient.Address(participant).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(workId)
            )
        );

        console.log('res:', res);
        return res[0];
    };

    const approveWork = async (creator, workId) => {
        const res = await executeTransaction(
            contract.call('approve_work', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(workId)
            )
        );

        console.log('res:', res);
        return res[0];
    };

    const rejectWork = async (creator, workId) => {
        const res = await executeTransaction(
            contract.call('reject_work', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(workId)
            )
        );

        console.log('res:', res);
        return res[0];
    };

    const cancelBounty = async (creator, bountyId) => {
        const res = await executeTransaction(
            contract.call('cancel_bounty', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(bountyId)
            )
        );

        console.log('res:', res);
        return res[0];
    };

    const closeBounty = async (creator, bountyId) => {
        const res = await executeTransaction(
            contract.call('close_bounty', 
                new SorobanClient.Address(creator).toScVal(), 
                SorobanClient.xdr.ScVal.scvU32(bountyId)
            )
        );

        console.log('res:', res);
        return res[0];
    };

    const tokenBalances = async (account, token) => {
        return await contract2.tokenBalances(account, token);
    };

    return {
        CONTRACT_ID,
        DEF_PAY_TOKEN,

        approveToken,

        createBounty,
        applyBounty,
        submitWork,
        approveWork,
        rejectWork,
        cancelBounty,
        closeBounty,

        tokenBalances
    }
}

export default useBounty;
