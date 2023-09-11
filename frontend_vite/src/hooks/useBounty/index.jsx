import { useCallback, useEffect, useState } from 'react';
import { useContract } from '../../context/ContractContext';
import * as BountyHunter from 'bountyhunter';

const useBounty = () => {
    const { setAdmin, setFee } = useContract();

    useEffect(() => {
        setAdmin("GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL");
        setFee("GDPOOKZIQTXKCFOG6UBQHNVAZOQ7AIMRCFGTGEUTI7IPWPWEL2MOR6PL", 30, "GBNJ6W2OWIYY4IVQGH4KWZUG5UQGWK2GZGPV43HQNSB6BBSJDLKD76AV");
    }, []);

    const getLastError = useCallback(
        async () => {
            return await BountyHunter.getLastError();
        }, 
        []
    );

    const countBounties = useCallback(
        async () => {
            return await BountyHunter.countBounties();
        }, 
        []
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

            return countBounties();
        }, 
        []
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
        []
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
        []
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
        []
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
        []
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
        []
    );

    const tokenBalances = useCallback(
        async (account, token) => {
            return await BountyHunter.countBounties(account, token);
        }, 
        []
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
