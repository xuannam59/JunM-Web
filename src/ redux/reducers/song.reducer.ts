import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISong } from "@/types/song.type";

interface ISongState {
    currentSong: ISong | null;
    playlist: ISong[];
    history: ISong[];
}

const initialState: ISongState = {
    currentSong: null,
    playlist: [],
    history: [],
}

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        doPlaySong: (state, action: PayloadAction<{ song: ISong; playlist?: ISong[] }>) => {
            state.currentSong = action.payload.song;
            if (action.payload.playlist) {
                state.playlist = action.payload.playlist;
            }
            window.localStorage.setItem("song_id", state.currentSong.song_id); // lưu bài hát vào localStorage
        },
        doSetPlaylist: (state, action: PayloadAction<ISong[]>) => {
            state.playlist = action.payload;
        },
        doAddHistory: (state, action: PayloadAction<ISong>) => {
            state.history.push(action.payload);
        }
    }
});

export const songReducer = songSlice.reducer;
export const { doPlaySong, doSetPlaylist } = songSlice.actions;