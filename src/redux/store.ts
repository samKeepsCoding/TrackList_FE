import { configureStore} from '@reduxjs/toolkit';

import playerReducer from './Features/Player/playerSlice';
import profileReducer from './Features/Profile/profileSlice';
import authReducer from './Features/Auth/authSlice'
import { tracklistCoreApi } from './Services/tracklistCore';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
   reducer: {
    player: playerReducer,
    profile: profileReducer,
    auth: authReducer,
    [tracklistCoreApi.reducerPath] : tracklistCoreApi.reducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tracklistCoreApi.middleware),
});