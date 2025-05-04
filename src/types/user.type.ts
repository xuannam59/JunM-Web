import { ISong } from "./song.type";
import { IVideo } from "./video.type";

export interface IListeningHistory {
    history_id: string;
    user_id: string;
    song_id?: string;
    video_id?: string;
    user: IUser;
    song?: ISong;
    video?: IVideo
    listened_at?: Date;
}

export interface IListeningHistoryForm {
    user_id: string;
    song_id?: string;
    video?: string;
}

export interface IUser {
    user_id: string;
    google_id?: string;
    username?: string;
    email: string;
    full_name?: string;
    avatar?: string;
    number_phone?: string;
    role: string;
    listeningHistories: IListeningHistory[];
    is_blocked?: boolean;
    is_deleted?: boolean;
    blocked_at?: Date;
    created_at?: Date
    updated_at?: Date;
    deleted_at?: Date;
}