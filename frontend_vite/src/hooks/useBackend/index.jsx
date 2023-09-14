import { useCallback, useEffect } from 'react';
import {BountyStatus, WorkStatus} from '../../hooks/useBounty';

const useBackend = () => {
    const BACKEND_URL = 'http://95.217.63.156/bounty/';

    const getUser = useCallback(
        async (wallet) => {
            let name = '';
            let github = '';
            let discord = '';

            try {
                const res = await fetch(BACKEND_URL + 'get_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                    })
                });

                const resData = await res.json();
                console.log('resData:', resData);
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    if (resData.user !== undefined) {
                        console.log('user:', resData.user);
                        name = resData.user['name'] ? resData.user['name'] : '';
                        github = resData.user['github'] ? resData.user['github'] : '';
                        discord = resData.user['discord'] ? resData.user['discord'] : '';
                    } else {
                        console.log(`can't extract data!`);
                    }
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return {name, github, discord};
        }, 
        []
    );

    const setUser = useCallback(
        async (wallet, name, github, discord) => {
            try {
                const res = await fetch(BACKEND_URL + 'set_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'name': name,
                        'github': github,
                        'discord': discord
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    console.log(resData.details);
                }
            } catch (error) {
                console.error('error2:', error);
            }
        }, 
        []
    );

    const addBounty = useCallback(
        async (wallet, bountyId, title, payAmount, duration, type, difficulty, topic, desc, gitHub, block) => {
            try {
                const res = await fetch(BACKEND_URL + 'add_bounty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'bountyId': bountyId,
                        'title': title,
                        'payAmount': payAmount,
                        'duration': duration,
                        'type': type,
                        'difficulty': difficulty,
                        'topic': topic,
                        'description': desc,
                        'gitHub': gitHub,
                        'block': block, 
                        'status': BountyStatus.ACTIVE
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                    return -1;
                } else {
                    console.log(resData.details);
                    return 0;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return -2;
        }, 
        []
    );

    const getRecentBounties = useCallback(
        async () => {
            try {
                const res = await fetch(BACKEND_URL + 'get_recent_bounties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    console.log(resData.details);
                    return resData.bounties;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return [];
        }, 
        []
    );

    const getSingleBounty = useCallback(
        async (bountyId) => {
            try {
                const res = await fetch(BACKEND_URL + 'get_single_bounty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'bountyId': bountyId
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    console.log(resData.details);
                    return resData.bounty;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return {};
        }, 
        []
    );

    const getAppliedBounties = useCallback(
        async (wallet) => {
            try {
                const res = await fetch(BACKEND_URL + 'get_bounties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet, 
                        'filter': 'applied'
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    console.log(resData.details);
                    return resData.bounties;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return [];
        }, 
        []
    );


    const getWorks = useCallback(
        async (bountyId, status) => {
            try {
                const res = await fetch(BACKEND_URL + 'get_works', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'bountyId': bountyId, 
                        'status': status
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    console.log(resData.details);
                    return resData.works;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return [];
        }, 
        []
    );

    const addWork = useCallback(
        async (wallet, bountyId, workId) => {
            try {
                const res = await fetch(BACKEND_URL + 'add_work', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'bountyId': bountyId,
                        'workId': workId,
                        'applyDate': Date.now(),
                        'status': WorkStatus.APPLIED
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                    return -1;
                } else {
                    console.log(resData.details);
                    return 0;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return -2;
        }, 
        []
    );

    const getWork = useCallback(
        async (wallet, bountyId) => {
            try {
                const res = await fetch(BACKEND_URL + 'get_work', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet, 
                        'bountyId': bountyId
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    console.log(resData.details);
                    return resData.work;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return {};
        }, 
        []
    );

    const submitWork = useCallback(
        async (wallet, workId, workRepo) => {
            try {
                const res = await fetch(BACKEND_URL + 'submit_work', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'workId': workId,
                        'workRepo': workRepo,
                        'submitDate': Date.now(),
                        'status': WorkStatus.SUBMITTED
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                    return -1;
                } else {
                    console.log(resData.details);
                    return 0;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return -2;
        }, 
        []
    );

    return {
        getUser, 
        setUser, 

        addBounty, 
        getRecentBounties, 
        getSingleBounty, 
        getAppliedBounties, 

        getWorks, 
        addWork, 
        getWork, 
        submitWork
    }
}

export default useBackend;
