export interface IAlbum {
    album_id: string;
    title: string;
    artist: string;
    cover_url: string;
    release_date: string;
    created_at?: Date;
    updated_at?: Date;
    songs?: unknown[];
}