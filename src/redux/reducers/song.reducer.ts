import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_SONG, ISong } from "@/types/song.type";

interface ISongState {
    isPlaying: boolean;
    currentSong: ISong ;
    playlist: ISong[];
    history: ISong[];
}

const initialState: ISongState = {
    isPlaying: false,
    currentSong: DEFAULT_SONG,
    playlist: [],
    history: [],
}

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        doPlaySong: (state, action: PayloadAction<{ song: ISong; playlist?: ISong[] }>) => {
            state.currentSong = action.payload.song;
            state.isPlaying = true;
            if (action.payload.playlist) {
                state.playlist = action.payload.playlist;
                window.localStorage.setItem("playlist", state.playlist.toString());
            }
            window.localStorage.setItem("song_id", state.currentSong.song_id);
            window.localStorage.setItem("song_time", "0");
        },
        doGetSongByLocalStorage: (state, action: PayloadAction<{ song: ISong; playlist?: ISong[] }>) => {
            state.currentSong = action.payload.song;
            if (action.payload.playlist) {
                state.playlist = action.payload.playlist;
            }
        },
        doNextSong: (state, action) => {
            state.history = [];
            state.playlist = [];
        },
        doBackSong: (state, action) => {
            state.history = [];
            state.playlist = [];
        },
        doSetIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
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
export const { 
    doPlaySong, doSetPlaylist, doGetSongByLocalStorage, 
    doSetIsPlaying, doNextSong, doBackSong
    } = songSlice.actions;