import { IArtist } from "./artist.type";
import { ISong } from "./song.type";

export interface IVideo {
    video_id: string;
    title:string;
    song_id: string;
    artist_id: string;
    video_url: string;
    release_date: Date;
    posted_by: string;
    created_at?: Date;
    updated_at?: Date;
    song: ISong;
    artist: IArtist;
}

export interface IVideoForm {
    video_id: string;
    title: string;
    song_id: string;
    artist_id: string;
    video_url: string;
    release_date: Date;
}