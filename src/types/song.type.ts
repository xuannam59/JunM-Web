import { DEFAULT_ARTIST, IArtist } from "./artist.type";
import { IPlaylistSong } from "./playlist.type";
import { IListeningHistory } from "./user.type";

export interface ILike {
    user_id: string;
    song_id: string;
    liked_at?: Date;
}

export interface ISong{
    song_id: string;
    title: string;
    thumbnail_url: string;
    file_url: string;
    listens: number;
    durations: number;
    lyrics: string;
    genre: string;
    release_date?: Date;
    artist_id: string;
    artist: IArtist;
    created_at?: Date;
    updated_at?: Date;
    likes: ILike[];
    playlistSongs: IPlaylistSong[];
    listeningHistory: IListeningHistory[];
}

export interface ISongForm {
    song_id: string;
    title: string;
    thumbnail_url: string;
    file_url: string;
    durations: number;
    genre: string;
    artist_id: string;
    lyrics: string;
    release_date:Date;
}

export interface ISongFilter {
    artist_id: string;
    genre: string;
}

// DEFAULT
export const DEFAULT_LIKE: ILike = {
    user_id: "",
    song_id: "",
};

export const DEFAULT_SONG: ISong = {
    song_id: "",
    title: "",
    thumbnail_url: "",
    file_url: "",
    listens: 0,
    durations: 0,
    lyrics: "",
    genre: "",
    artist_id: "",
    artist: DEFAULT_ARTIST,
    likes: [],
    playlistSongs: [],
    listeningHistory: []
};

export const  DEFAULT_SONG_FILTER = {
    artist_id: "",
    genre: ""
}