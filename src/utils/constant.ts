export const routes = {
    // client
    DEFAULT: "/",
    LOGIN: "login",
    REGISTER: "register",
    // admin
    ADMIN: "admin",
    ADMIN_USER: "users",
    ADMIN_ARTIST: "artists",
    ADMIN_SONG: "songs",
    ADMIN_VIDEO: "videos",
    ADMIN_ALBUM: "albums",
    ADMIN_PLAYLIST: "playlists",
    ADMIN_SETTING: "settings",

    NOT_FOUND: "*"
} as const;