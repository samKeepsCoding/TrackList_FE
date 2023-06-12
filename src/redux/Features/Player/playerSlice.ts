import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Loop, PlayerState } from '../../../Types/index'




const initialState: PlayerState = {
    isPlaying: false,
    currentLoops: [],
    activeLoop: null,
    isActive: false,
    currentIndex: 0,
}

const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers: {
        setActiveLoop: (state, action: PayloadAction<{loop: Loop; index : number}>) => {

                state.activeLoop = action.payload.loop;
                state.isActive = true;

                state.currentIndex = action.payload.index;
        },

        playPause: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },

        setCurrentLoops : (state, action: PayloadAction<Loop[]>) => {
            state.currentLoops = action.payload;
        },

        nextLoop: (state, action: PayloadAction<number>) => {
            if ( state.activeLoop && (state.currentIndex >= state.currentLoops.length - 1)) {
                state.activeLoop = state.currentLoops[0];
                state.currentIndex = 0;
            } else {
                state.activeLoop = state.currentLoops[action.payload + 1]
                state.currentIndex = action.payload + 1
            }
        },

        prevLoop: (state, action: PayloadAction<number>) => {
            if ((action.payload) === 0) {
                state.activeLoop = state.currentLoops[state.currentLoops.length - 1];
                state.currentIndex = (state.currentLoops.length - 1)
                console.log("true")
            } else {
                state.activeLoop = state.currentLoops[action.payload - 1]
                state.currentIndex = action.payload - 1
            }
        },
        

    }
})

export const {setActiveLoop, playPause, setCurrentLoops, nextLoop, prevLoop} = playerSlice.actions;
export default playerSlice.reducer;