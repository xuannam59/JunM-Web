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

export interface IArtistFrom {
    artist_id: string;
    artist_name: string;
    avatar: string;
}