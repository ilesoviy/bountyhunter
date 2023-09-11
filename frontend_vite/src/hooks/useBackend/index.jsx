import { useCallback, useEffect } from 'react';

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
        async (wallet, bountyId, title, payAmount, desc, duration, type, topic, difficulty, block) => {
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
                        'description': desc,
                        'duration': duration,
                        'type': type,
                        'topoic': topic,
                        'difficulty': difficulty,
                        'block': block
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

    return {
        getUser, 
        setUser,
        addBounty
    }
}

export default useBackend;
