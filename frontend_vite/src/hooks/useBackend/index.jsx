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
                if (resData.error) {
                    console.error('error1:', resData.error);
                } else {
                    if (resData.user !== undefined) {
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
        }
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
                    console.error(resData.error);
                } else {
                    console.log(resData.details);
                }
            } catch (error) {
                console.error(error);
            }
        }
    );

    return {
        getUser, 
        setUser
    }
}

export default useBackend;
