export interface IPlaylistSong {
    playlist_id: string;
    song_id: string;
    added_at: Date;
}

export interface IPlayList {
    playlist_id: string;
    user: string;
    title: string;
    is_public: boolean;
    created_at?:Date;
    updated_at?: Date;
    playlistSongs?: IPlaylistSong[];
}