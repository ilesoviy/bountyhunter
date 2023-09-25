import { useCallback, useEffect } from 'react';
import axios from 'axios';
import {BountyStatus, WorkStatus} from '../../hooks/useBounty';

const useBackend = () => {
    const BACKEND_URL = 'https://bounty.cryptosnowprince.com/api/bounty/';
    // const BACKEND_URL = 'http://95.217.63.156:8888/api/bounty/';
    // const BACKEND_URL = 'http://localhost:8888/api/bounty/';

    const getUser = useCallback(
        async (wallet) => {
            let name = '';
            let github = '';
            let discord = '';
            let image = {};

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
                // console.log('resData:', resData);
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    if (resData.user !== undefined) {
                        // console.log('user:', resData.user);
                        return resData.user;
                    } else {
                        console.log(`can't extract data!`);
                    }
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return {name, github, discord, image};
        }, 
        []
    );

    const setUser = useCallback(
        async (wallet, name, github, discord, image) => {
            const formData = new FormData();

            formData.append('wallet', wallet);
            formData.append('name', name);
            formData.append('github', github);
            formData.append('discord', discord);
            formData.append('image', image);

            console.log('formData:', formData);

            axios.post(BACKEND_URL + 'set_user', formData)
                .then((response) => {
                    console.log(response.data.details);
                    return 0;
                })
                .catch ((error) => {
                    console.error('Error uploading avatar:', error);
                    return -1;
                });
        }, 
        []
    );

    const addBounty = useCallback(
        async (wallet, bountyId, title, payAmount, duration, type, difficulty, topic, description, gitHub, block) => {
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
                        'description': description,
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

    const getCreatedBounties = useCallback(
        async (wallet) => {
            try {
                const res = await fetch(BACKEND_URL + 'get_bounties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet, 
                        'filter': 'created'
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

    const countSubmissions = useCallback(
        async (wallet, bountyId) => {
            try {
                const res = await fetch(BACKEND_URL + 'count_submissions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'bountyId': bountyId,
                        'status': WorkStatus.SUBMITTED
                    })
                });
    
                const resData = await res.json();
                if (resData.error) {
                    console.error('error1:', resData.error);
                    return -1;
                } else {
                    return resData.count;
                }
            } catch (error) {
                console.error('error2:', error);
            }

            return -2;
        }, 
        []
    );

    const cancelBountyB = useCallback(
        async (wallet, bountyId) => {
            try {
                const res = await fetch(BACKEND_URL + 'cancel_bounty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'bountyId': bountyId,
                        'status': BountyStatus.CANCELLED
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

    const closeBountyB = useCallback(
        async (wallet, bountyId) => {
            try {
                const res = await fetch(BACKEND_URL + 'close_bounty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'bountyId': bountyId,
                        'status': BountyStatus.CLOSED
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
        async (wallet, workId, workTitle, workDesc, workRepo) => {
            try {
                const res = await fetch(BACKEND_URL + 'submit_work', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'workId': workId,
                        'title': workTitle,
                        'description': workDesc,
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

    const approveWorkB = useCallback(
        async (wallet, workId) => {
            try {
                const res = await fetch(BACKEND_URL + 'approve_work', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'workId': workId,
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

    const rejectWorkB = useCallback(
        async (wallet, workId) => {
            try {
                const res = await fetch(BACKEND_URL + 'reject_work', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'wallet': wallet,
                        'workId': workId,
                        'status': WorkStatus.REJECTED
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
        getCreatedBounties, 
        countSubmissions, 
        cancelBountyB, 
        closeBountyB, 

        getWorks, 
        addWork, 
        getWork, 
        submitWork, 
        approveWorkB, 
        rejectWorkB
    }
}

export default useBackend;
