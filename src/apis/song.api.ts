import { IBackendRes, IBackendResWithPagination } from "@/types/backend.type";
import axios from "@/configs/axios-customize";
import { ISong, ISongForm } from "@/types/song.type";

export const callGetSongs = (query: unknown) => {
    return axios.get<IBackendResWithPagination<ISong>>(`api/v1/songs/all?${query}`);
}

export const callCreateSong = (data: ISongForm) => {
    return axios.post<IBackendRes<ISong>>(`api/v1/songs/create`, data);
}

export const callUpdateSong = (data: ISongForm) => {
    return axios.patch<IBackendRes<string>>(`api/v1/songs/update/${data.song_id}`, data);
}

export const callDeleteSong = (song_id: string) => {
    return axios.delete<IBackendRes<string>>(`api/v1/songs/delete/${song_id}`);
}