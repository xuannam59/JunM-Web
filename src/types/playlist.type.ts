import { ISong } from "./song.type";
import { IUser } from "./user.type";

export interface IPlaylistSong {
    playlist_id: string;
    song_id: string;
    added_at: Date;
    song: ISong;
    playList: IPlayList;
}

export interface IPlayList {
    playlist_id: string;
    user_id: string;
    user: IUser;
    title: string;
    is_public: boolean;
    slug: string;
    created_at?:Date;
    updated_at?: Date;
    playlistSongs: IPlaylistSong[];
}

export interface IPlayListForm {
    playlist_id: string;
    title: string;
    is_public: string;
    songs: string[];
}

export interface IPlaylistSongForm {
    playlist_id: string;
    song_id: string;
}