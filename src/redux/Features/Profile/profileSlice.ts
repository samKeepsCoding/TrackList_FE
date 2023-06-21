import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from '../../../Types';

const initialState: ProfileState = {
    userName: "",
    likedLoops: [],
    profilePicData: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        
    } 
})


export const {} = profileSlice.actions
export default profileSlice.reducer;