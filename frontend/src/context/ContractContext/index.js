import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
// import { useCustomWallet } from '../WalletContext';
// import { useGlobal } from '../GlobalContext';
// import { useDispatch, useSelector } from 'react-redux';

// import { BASE_FEE } from "stellar-sdk";
// import * as SorobanClient from "soroban-client";
// import * as BountyHunter from "bountyhunter";


export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
//     const { chainId } = useGlobal();
//     const { wallet } = useCustomWallet();

//     const dispatch = useDispatch();

//     const [reloadCounter, setReloadCounter] = useState(0);

//     useEffect(() => {
//         let ac = new AbortController()

//         const reload = () => {
//             setReloadCounter((t) => {
//                 return t + 1
//             })
//         }

//         let tmr = setInterval(() => {
//             if (ac.signal.aborted === false) {
//                 reload()
//             }
//         }, 50000)

//         return () => {
//             ac.abort()
//             clearInterval(tmr)
//         }
//     }, [])

//     useEffect(() => {
//         setReloadCounter((t) => {
//             return t + 1
//         })
//     }, [wallet])

//     const refreshPages = () => {
//         setTimeout(() => {
//             setReloadCounter((t) => {
//                 return t + 1
//             })
//         }, 2000)
//     }

//     const server = new SorobanClient.Server(
//         chainId === 169 ? "https://horizon.stellar.org" : "https://horizon-futurenet.stellar.org"
//     )

//     async function executeTransaction(operation: SorobanClient.xdr.Operation): Promise<Number> {
//         const sourceAcc = await server.getAccount(address);
    
//         const transaction0 = new SorobanClient.TransactionBuilder(sourceAcc, {
//             fee: BASE_FEE, 
//             networkPassphrase: SorobanClient.Networks.FUTURENET,
//         })
//             .addOperation(operation)
//             .setTimeout(30)
//             .build();
    
//         const transaction = await server.prepareTransaction(transaction0);
//         const txXDR = transaction.toXDR();
//         console.log('txXDR:', txXDR);
//         const signedTx = await signTransaction(txXDR, {
//             network: 'FUTURENET',
//             networkPassphrase: SorobanClient.Networks.FUTURENET,
//             accountToSign: pubKey,
//         });
//         const txEnvelope = SorobanClient.xdr.TransactionEnvelope.fromXDR(signedTx, 'base64');
//         const tx = new SorobanClient.Transaction(txEnvelope, SorobanClient.Networks.FUTURENET);
    
//         try {
//             const response = await server.sendTransaction(tx);
            
//             console.log('Sent! Transaction Hash:', response.hash);
//             // Poll this until the status is not "pending"
//             if (response.status !== "PENDING") {
//                 console.log('Transaction status:', response.status);
//                 // console.log(JSON.stringify(response));
    
//                 if (response.status === "ERROR") {
//                     return -1;
//                 }
//             } else {
//                 let response2;
    
//                 do {
//                     // Wait a second
//                     await new Promise(resolve => setTimeout(resolve, 1000));
    
//                     // See if the transaction is complete
//                     response2 = await server.getTransaction(response.hash);
//                 } while (response2.status !== "SUCCESS" && response2.status !== "FAILED");
    
//                 console.log('Transaction2 status:', response2.status);
//                 // console.log(JSON.stringify(response2));
    
//                 if (response2.status === "FAILED") {
//                     return -1;
//                 }
//             }
//         } catch (e) {
//             console.error('An error has occured:', e);
//             return -1;
//         }
    
//         return 0;
//     }

//     const setAdmin = useCallback(
//         async(oldAdmin, newAdmin) => {
//             const contract = new SorobanClient.Contract(BountyHunter.CONTRACT_ID);
            
//             const res = await executeTransaction(
//                 contract.call("set_admin", 
//                     SorobanClient.xdr.ScVal.scvAddress(oldAdmin), 
//                     SorobanClient.xdr.ScVal.scvAddress(newAdmin)
//             ));

//             console.log('result:', res);
//         }, 
//         [chainId]
//     )

//     useEffect(() => {
//         dispatch(setChainId(chainId))
//         dispatch(setAdmin("", process.env.Admin))
//     })

//     return (
//         <ContractContext.Provider value={{
//             reloadCounter,
//             refreshPages,
//             setAdmin
//         }}>
//             {children}
//         </ContractContext.Provider>
//     )
}

export const useContract = () => {
    const contractManager = useContext(ContractContext)
    return contractManager || [{}]
}