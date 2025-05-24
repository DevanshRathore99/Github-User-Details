'use client'
import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData/mockUser';
import mockRepos from './mockData/mockRepos';
import mockFollowers from './mockData/mockFollowers';

const rootUrl = 'https://api.github.com';

type GithubContextType = {
    githubUser: any;
    repos: any[];
    followers: any[];
    requests: number;
    error: { show: boolean; msg: string };
    searchGithubUser: (user: string) => Promise<void>;
    isLoading: boolean;
};

const GithubContext = createContext<GithubContextType | null>(null);

const GithubProvider = ({ children }: { children: React.ReactNode }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: "" });
    // console.log('githubUser', githubUser);
    // console.log('repos', repos);
    // console.log('followers', followers);
    // console.log('requests', requests);
    // console.log('isLoading', isLoading);
    // console.log('error', error);


    const searchGithubUser = async (user: string) => {
        toggleError();
        setIsLoading(true);

        try {
            const userResponse = await fetch(`/api/github?user=${user}`);
            if (!userResponse.ok) {
                throw new Error('User not found');
            }
            const userData = await userResponse.json();
            setGithubUser(userData);

            const [reposResult, followersResult] = await Promise.allSettled([
                fetch(`/api/github/repos?user=${user}`),
                fetch(`/api/github/followers?user=${user}`)
            ]);

            if (reposResult.status === 'fulfilled') {
                const reposData = await reposResult.value.json();
                setRepos(reposData);
            }

            if (followersResult.status === 'fulfilled') {
                const followersData = await followersResult.value.json();
                setFollowers(followersData);
            }

        } catch (error) {
            toggleError(true, 'There is no user with that username.');
        }

        await checkRequests();
        setIsLoading(false);
    };


    const checkRequests = async () => {
        try {
            const response = await fetch(`${rootUrl}/rate_limit`);
            if (!response.ok) {
                throw new Error('Failed to fetch rate limit');
            }
            const data = await response.json();
            const {
                rate: { remaining },
            } = data;
            setRequests(remaining);
            if (remaining === 0) {
                toggleError(true, 'Sorry, You have exceeded your hourly rate limit.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    function toggleError(show = false, msg = '') {
        setError({ show, msg });
    }

    useEffect(() => {
        const init = async () => {
            await checkRequests();
            await searchGithubUser('CodeWithHarry'); // or any default username
        };
        init();
    }, []);


    return (
        <GithubContext.Provider value={{
            githubUser,
            repos,
            followers,
            requests,
            error,
            searchGithubUser,
            isLoading,
        }}>
            {children}
        </GithubContext.Provider>
    );
};

export { GithubProvider, GithubContext };
