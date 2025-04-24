export interface IListeningHistory {
    history_id: string;
    user: string;
    song: string;
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
    is_blocked: boolean;
    is_deleted: boolean;
    blocked_at?: Date;
    created_at?: Date
    updated_at?: Date;
    deleted_at?: Date;
}