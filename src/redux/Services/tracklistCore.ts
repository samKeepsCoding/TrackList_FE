import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Loop } from '../../Types';

interface Profile {
    id: number;
    likedLoops: Loop[] | null;
    profilePicData: null | string;
    userName: string;
}

export const tracklistCoreApi = createApi({
    reducerPath: 'tracklistCoreApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/'}),
    endpoints: (builder) => ({
        getProducerLoops: builder.query<Loop[], string>({ query: ( userId ) => `Loop/userLoops/${userId}`}),
        getUserProfile: builder.query<Profile, string>({query: (userId) => `Profiles/${userId}`}),
    })
})

export const { useGetProducerLoopsQuery, useGetUserProfileQuery } = tracklistCoreApi;