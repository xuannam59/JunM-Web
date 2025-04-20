import { IAlbum } from "./album.type";
import { IArtist } from "./artist.type";
import { IPlaylistSong } from "./playlist.type";

export interface ILike {
    user_id: string;
    song_id: string;
    liked_at: Date;
}

export interface ISong{
    song_id: string;
    title: string;
    duration: number;
    file_url: string;
    release_date: Date;
    genre: string;
    artist: string | IArtist;
    album: string | IAlbum;
    created_at: Date;
    updated_at: Date;
    likes: ILike[];
    playlistSongs: IPlaylistSong[];
    // listeningHistory: ListeningHistory[];
}