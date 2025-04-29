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
    follows: unknown[];
    songs: unknown[];
    albums: unknown[];
    videos: unknown[]
}

export interface IArtistForm {
    artist_id: string;
    artist_name: string;
    avatar: string;
}