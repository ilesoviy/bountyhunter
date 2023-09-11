import { useCallback, useEffect, useState } from 'react';
import { useContract } from '../../context/ContractContext';

const useBounty = () => {
    const { setAdmin, setFee } = useContract();

    useEffect(() => {
        setAdmin("GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL");
        setFee("GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL", 30, "GBNJ6W2OWIYY4IVQGH4KWZUG5UQGWK2GZGPV43HQNSB6BBSJDLKD76AV");
    }, []);

    const getLastError = useCallback(
        () => {
            return BountyHunter.getLastError();
        }, 
        [chainId]
    );

    const countBounties = useCallback(
        () => {
            return BountyHunter.countBounties();
        }, 
        [chainId]
    );

    const createBounty = useCallback(
        (creator, name, reward, pay_token, deadline) => {
            BountyHunter.invoke({
                method: "create_bounty", 
                args: [
                    creator, 
                    name, 
                    reward, 
                    pay_token, 
                    deadline
                ]
            });
        }, 
        [chainId]
    );

    const applyBounty = useCallback(
        (participant, bountyId) => {
            BountyHunter.invoke({
                method: "apply_bounty", 
                args: [
                    participant, 
                    bountyId
                ]
            });
        }, 
        [chainId]
    );

    const submitWork = useCallback(
        (participant, workId, workRepo) => {
            BountyHunter.invoke({
                method: "submit_work",
                args: [
                    participant,
                    workId,
                    workRepo
                ]
            });
        },
        [chainId]
    );

    const approveWork = useCallback(
        (creator, workId) => {
            BountyHunter.invoke({
                method: "approve_work",
                args: [
                    creator,
                    workId
                ]
            });
        },
        [chainId]
    );

    const rejectWork = useCallback(
        (creator, workId) => {
            BountyHunter.invoke({
                method: "reject_work",
                args: [
                    creator,
                    workId
                ]
            });
        },
        [chainId]
    );

    const cancelBounty = useCallback(
        (creator, bountyId) => {
            BountyHunter.invoke({
                method: "cancel_bounty",
                args: [
                    creator,
                    bountyId
                ]
            });
        },
        [chainId]
    );

    const tokenBalances = useCallback(
        (account, token) => {
            return BountyHunter.countBounties(account, token);
        }, 
        [chainId]
    );

    return {
        getLastError,
        countBounties,

        createBounty,
        applyBounty,
        submitWork,
        approveWork,
        rejectWork,
        cancelBounty,

        tokenBalances
    }
}

export default useBounty;
