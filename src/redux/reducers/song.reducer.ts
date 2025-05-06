import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_SONG, ISong } from "@/types/song.type";

interface ISongState {
    isPlaying: boolean;
    isCollapsed: boolean;
    currentSong: ISong;
    playlist: ISong[];
    history: ISong[];
}

const initialState: ISongState = {
    isPlaying: false,
    isCollapsed: false,
    currentSong: DEFAULT_SONG,
    playlist: [],
    history: [],
}
 
const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        doPlaySong: (state, action: PayloadAction<ISong>) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
            
            window.localStorage.setItem("song_id", state.currentSong.song_id);
            window.localStorage.setItem("song_time", "0");
        },
        doGetSongByLocalStorage: (state, action: PayloadAction<{ song: ISong; playlist?: ISong[] }>) => {
            state.currentSong = action.payload.song;
            if (action.payload.playlist) {
                state.playlist = action.payload.playlist;
            }
        },
        doSetIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        doSetPlaylist: (state, action: PayloadAction<ISong[]>) => {
            state.playlist = action.payload;
        },
        doSetHistory: (state, action: PayloadAction<ISong[]>) => {
            state.history = action.payload;
        },
        doSetIsCollapsed: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        doNextSong: (state) => {
            if (state.playlist.length > 0) {
                // Thêm bài hát hiện tại vào history
                state.history.push(state.currentSong);
                
                const nextSong = state.playlist.shift();
                if(nextSong) {

                    state.currentSong = nextSong;
                    window.localStorage.setItem("song_id", state.currentSong.song_id);
                    window.localStorage.setItem("song_time", "0");
                    window.localStorage.setItem("playlist", JSON.stringify(state.playlist));
                    window.localStorage.setItem("history", JSON.stringify(state.history));
                }
            }
        },
        doBackSong: (state) => {
            if (state.history.length > 0) {
                const previousSong = state.history.pop();
                if (previousSong) {
                   
                    // Thêm bài hát hiện tại vào đầu playlist
                    state.playlist.unshift(state.currentSong);
                    state.currentSong = previousSong;
                    window.localStorage.setItem("song_id", state.currentSong.song_id);
                    window.localStorage.setItem("song_time", "0");
                    window.localStorage.setItem("playlist", JSON.stringify(state.playlist));
                    window.localStorage.setItem("history", JSON.stringify(state.history));
                }
            }
        },
    }
});

export const songReducer = songSlice.reducer;
export const { 
    doPlaySong, doSetPlaylist,doSetHistory, doGetSongByLocalStorage, 
    doSetIsPlaying, doNextSong, doBackSong, doSetIsCollapsed
    } = songSlice.actions;