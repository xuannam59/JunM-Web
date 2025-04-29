import { IAlbum } from "./album.type";
import { IArtist } from "./artist.type";
import { IPlaylistSong } from "./playlist.type";
import { IListeningHistory } from "./user.type";

export interface ILike {
    user_id: string;
    song_id: string;
    liked_at: Date;
}

export interface ISong{
    song_id: string;
    title: string;
    thumbnail_url: string;
    file_url: string;
    views: number;
    durations: number;
    lyrics: string;
    genre: string;
    release_date: Date;
    artist_id: string;
    artist: IArtist;
    album_id: string | null;
    album: IAlbum | null;
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
    album_id: string | null;
    lyrics: string;
    release_date:Date;
}