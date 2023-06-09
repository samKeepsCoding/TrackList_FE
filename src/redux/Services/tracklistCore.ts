import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Loop } from '../../Types';


export const tracklistCoreApi = createApi({
    reducerPath: 'tracklistCoreApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/'}),
    endpoints: (builder) => ({
        getProducerLoops: builder.query<Loop[], string>({ query: ( userId ) => `Loop/userLoops/${userId}`})
    })
})

export const { useGetProducerLoopsQuery } = tracklistCoreApi;