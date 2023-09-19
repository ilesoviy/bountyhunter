import { useCallback, useEffect, useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
// import { useCustomWallet } from '../../context/WalletContext';
// import { useContract } from '../../context/ContractContext';
import * as BountyHunter from 'bountyhunter';
import * as SorobanClient from 'soroban-client';
import freighter from "@stellar/freighter-api";
const {
    isConnected,
    isAllowed,
    getPublicKey,
    signTransaction,
} = freighter;

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
    // const { walletAddress } = useCustomWallet();
    // const { setAdmin, setFee } = useContract();

    const DEF_PAY_TOKEN = 'CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT';

    useEffect(() => {
        // setAdmin("GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL", "GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL");
        // setFee("GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL", 30, "GBNJ6W2OWIYY4IVQGH4KWZUG5UQGWK2GZGPV43HQNSB6BBSJDLKD76AV");
    }, []);

    const contract = new SorobanClient.Contract(BountyHunter.networks.futurenet.contractId);
    const contract2 = new BountyHunter.Contract({contractId: BountyHunter.networks.futurenet.contractId, 
        networkPassphrase: BountyHunter.networks.futurenet.networkPassphrase, 
        rpcUrl: chainId === 169 ? "https://rpc-mainnet.stellar.org" : "https://rpc-futurenet.stellar.org", 
        wallet: freighter
    });

    const server = new SorobanClient.Server(
        chainId === 169 ? "https://rpc-mainnet.stellar.org" : "https://rpc-futurenet.stellar.org"
    )

    async function executeTransaction(operation: SorobanClient.xdr.Operation, baseFee?: string): Promise<number> {
        
        const pubKey = await getPublicKey();
        console.log('pubKey:', pubKey);

        const sourceAcc = await server.getAccount(pubKey);

        const transaction0 = new SorobanClient.TransactionBuilder(sourceAcc, {
            fee: (baseFee === undefined || baseFee === "") ? SorobanClient.BASE_FEE : baseFee,
            networkPassphrase: SorobanClient.Networks.FUTURENET,
        })
            .addOperation(operation)
            .setTimeout(30)
            .build();

        const simulated = await server.simulateTransaction(transaction0);
        // console.log('simulated:', simulated);

        const transaction = await server.prepareTransaction(transaction0);
        const txXDR = transaction.toXDR();
        // console.log('txXDR:', txXDR);
        const signedTx = await signTransaction(txXDR, {
            network: 'FUTURENET',
            networkPassphrase: SorobanClient.Networks.FUTURENET,
            accountToSign: pubKey,
        });
        const txEnvelope = SorobanClient.xdr.TransactionEnvelope.fromXDR(signedTx, 'base64');
        const tx = new SorobanClient.Transaction(txEnvelope, SorobanClient.Networks.FUTURENET);

        try {
            const response = await server.sendTransaction(tx);

            console.log('Sent! Transaction Hash:', response.hash);
            // Poll this until the status is not "pending"
            if (response.status !== "PENDING") {
                console.log('Transaction status:', response.status);
                // console.log(JSON.stringify(response));

                if (response.status === "ERROR") {
                    return -1;
                }
            } else {
                let response2;

                do {
                    // Wait a second
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // See if the transaction is complete
                    response2 = await server.getTransaction(response.hash);
                } while (response2.status !== "SUCCESS" && response2.status !== "FAILED");

                console.log('Transaction2 status:', response2.status);
                // console.log(JSON.stringify(response2));

                if (response2.status === "FAILED") {
                    return -1;
                }
            }
        } catch (e) {
            console.error('An error has occured:', e);
            return -1;
        }

        return 0;
    }

    const approveToken = useCallback(
        async (from, spender, payAmount) => {
            const tokenContract = new SorobanClient.Contract(DEF_PAY_TOKEN);
            const res = await executeTransaction(
                tokenContract.call("approve", 
                    new SorobanClient.Address(from).toScVal(), // from
                    new SorobanClient.Address(spender).toScVal(), // spender
                    SorobanClient.nativeToScVal(Number(payAmount * 2), { type: 'i128' }), // double payAmount for fee
                    SorobanClient.xdr.ScVal.scvU32(535680 /* 34560 */) // expiration_ledger
                ),
            );

            console.log('res:', res);
            return res;
        }, 
        []
    );

    const getLastError = useCallback(
        async () => {
            return await contract2.getLastError();
        }, 
        []
    );

    const countBounties = useCallback(
        async () => {
            return await contract2.countBounties();
        }, 
        []
    );

    const countWorks = useCallback(
        async () => {
            return await contract2.countWorks();
        }, 
        []
    );

    const parseResultXdr = (xdr) => {
        console.log('xdr:', xdr);
    }

    const createBounty = useCallback(
        async (creator, name, reward, payToken, deadline) => {
            const res = await executeTransaction(
                contract.call("create_bounty", 
                    new SorobanClient.Address(creator).toScVal(), 
                    SorobanClient.xdr.ScVal.scvString(name), 
                    SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(reward)), 
                    new SorobanClient.Address(payToken).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(deadline))
                ),
                "1000000"
            );

            // const res = await BountyHunter.invoke({
            //     method: "create_bounty", 
            //     args: [
            //         new SorobanClient.Address(creator).toScVal(), 
            //         SorobanClient.xdr.ScVal.scvString(name), 
            //         SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(reward)), 
            //         SorobanClient.xdr.Address(payToken).toScVal()), 
            //         SorobanClient.xdr.ScVal.scvU64(new SorobanClient.xdr.Uint64(deadline))
            //     ],
            //     parseResultXdr
            // });

            // const res = await contract2.createBounty({
            //     new BountyHunter.Address(creator), 
            //     name, 
            //     reward, 
            //     new BountyHunter.Address(payToken), 
            //     deadline
            // });

            console.log('res:', res);
            if (res)
                return res;

            return await countBounties();
        }, 
        []
    );

    const applyBounty = useCallback(
        async (participant, bountyId) => {
            // const res = BountyHunter.invoke({
            //     method: "apply_bounty", 
            //     args: [
            //         new SorobanClient.Address(participant).toScVal(), 
            //         SorobanClient.xdr.ScVal.scvU32(bountyId)
            //     ]
            // });

            const res = await executeTransaction(
                contract.call("apply_bounty", 
                    new SorobanClient.Address(participant).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU32(bountyId)
                )
            );

            console.log('res:', res);
            if (res)
                return res;

            return await countWorks();
        }, 
        []
    );

    const submitToBounty = useCallback(
        async (participant, workId, workRepo) => {
            // const res = BountyHunter.invoke({
            //     method: "submit_work",
            //     args: [
            //         new SorobanClient.Address(participant).toScVal(), 
            //         SorobanClient.xdr.ScVal.scvU32(workId), 
            //         SorobanClient.xdr.ScVal.scvString(workRepo)
            //     ]
            // });

            const res = await executeTransaction(
                contract.call("submit_work", 
                    new SorobanClient.Address(participant).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU32(workId), 
                    SorobanClient.xdr.ScVal.scvString(workRepo) // not necessary
                )
            );

            console.log('res:', res);
            return res;
        },
        []
    );

    const approveWork = useCallback(
        async (creator, workId) => {
            // const res = BountyHunter.invoke({
            //     method: "approve_work",
            //     args: [
            //         new SorobanClient.Address(creator).toScVal(), 
            //         SorobanClient.xdr.ScVal.scvU32(workId)
            //     ]
            // });

            const res = await executeTransaction(
                contract.call("approve_work", 
                    new SorobanClient.Address(creator).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU32(workId)
                )
            );

            console.log('res:', res);
            return res;
        },
        []
    );

    const rejectWork = useCallback(
        async (creator, workId) => {
            // cont res = BountyHunter.invoke({
            //     method: "reject_work",
            //     args: [
            //         creator,
            //         workId
            //     ]
            // });

            const res = await executeTransaction(
                contract.call("reject_work", 
                    new SorobanClient.Address(creator).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU32(workId)
                )
            );

            console.log('res:', res);
            return res;
        },
        []
    );

    const cancelBounty = useCallback(
        async (creator, bountyId) => {
            // const res = BountyHunter.invoke({
            //     method: "cancel_bounty",
            //     args: [
            //         creator,
            //         bountyId
            //     ]
            // });

            const res = await executeTransaction(
                contract.call("cancel_bounty", 
                    new SorobanClient.Address(creator).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU32(bountyId)
                )
            );

            console.log('res:', res);
            return res;
        },
        []
    );

    const closeBounty = useCallback(
        async (creator, bountyId) => {
            // const res = BountyHunter.invoke({
            //     method: "close_bounty",
            //     args: [
            //         creator,
            //         bountyId
            //     ]
            // });

            const res = await executeTransaction(
                contract.call("close_bounty", 
                    new SorobanClient.Address(creator).toScVal(), 
                    SorobanClient.xdr.ScVal.scvU32(bountyId)
                )
            );

            console.log('res:', res);
            return res;
        },
        []
    );

    const tokenBalances = useCallback(
        async (account, token) => {
            return await contract2.tokenBalances(account, token);
        }, 
        []
    );

    return {
        CONTRACT_ID,
        DEF_PAY_TOKEN,

        approveToken,

        getLastError,
        countBounties,
        countWorks,

        createBounty,
        applyBounty,
        submitToBounty,
        approveWork,
        rejectWork,
        cancelBounty,
        closeBounty,

        tokenBalances
    }
}

export default useBounty;
