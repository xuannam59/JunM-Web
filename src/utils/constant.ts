import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";

export const routes = {
    // client
    DEFAULT: "/",
    LOGIN: "login",
    REGISTER: "register",
    GOOGLE: "google/:access_token",
    LIBRARY: "library",
    PLAYLIST: "playlist",
    // admin
    ADMIN: "admin",
    ADMIN_USER: "users",
    ADMIN_ARTIST: "artists",
    ADMIN_SONG: "songs",
    ADMIN_VIDEO: "videos",
    ADMIN_PLAYLIST: "playlists",
    ADMIN_SETTING: "settings",

    NOT_FOUND: "*"
} as const;

export const replaceSlug = (str: string): string => {
    str = str.toLowerCase();
    str = str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    str = str
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    return str;
}

export const handleChangeUpload = (setState: React.Dispatch<React.SetStateAction<UploadFile[]>>) =>
    ({ fileList: newFileList }: UploadChangeParam<UploadFile>) =>
        setState(newFileList.map((item) => ({
            ...item,
            url: item.originFileObj ? URL.createObjectURL(item.originFileObj) : item.url,
            status: 'done'
    })));

export const numberWithCommas=(x: string | number)=> {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const capitalizeVietnamese = (text: string) => {
    return text
        .toLowerCase()
        .replace(/(^|\s)([a-zăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ])/g, (match, p1, p2) => {
            return p1 + (p2 === 'đ' ? 'Đ' : p2.toUpperCase());
        });
}