import { configureStore} from '@reduxjs/toolkit';

import playerReducer from './Features/Player/playerSlice';
import { tracklistCoreApi } from './Services/tracklistCore';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
   reducer: {
    player: playerReducer,
    [tracklistCoreApi.reducerPath] : tracklistCoreApi.reducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tracklistCoreApi.middleware),
});