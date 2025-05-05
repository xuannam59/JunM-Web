import { ISong } from "./song.type";
import { IVideo } from "./video.type";

export interface IFollow {
    artist_id: string;
    user_id: string;
    follow_at: Date;
}

export interface IArtist{
    artist_id: string;
    artist_name: string;
    avatar: string;
    slug: string;
    created_at?: Date;
    updated_at?: Date;
    follows: IFollow[];
    songs: ISong[];
    videos: IVideo[]
}

export interface IArtistForm {
    artist_id: string;
    artist_name: string;
    avatar: string;
}

// DEFAULT
export const DEFAULT_ARTIST: IArtist = {
    artist_id: "",
    artist_name: "",
    avatar: "",
    slug: "",
    follows: [],
    songs: [],
    videos: []
};

export const DEFAULT_FOLLOW: IFollow = {
    artist_id: "",
    user_id: "",
    follow_at: new Date()
};
