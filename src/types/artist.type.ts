export interface IArtist{
    artist_id: string;
    users? : string;
    artist_name: string;
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
    songs?: unknown[];
    albums?: unknown[];
    videos?: unknown[]
}