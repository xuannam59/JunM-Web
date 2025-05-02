import { IBackendRes, IBackendResWithPagination } from "@/types/backend.type";
import axios from "@/configs/axios-customize";
import { IPlayList, IPlayListForm } from "@/types/playlist.type";

export const callGetPlaylists = (query: unknown) => {
    return axios.get<IBackendResWithPagination<IPlayList>>(`api/v1/playlists/all?${query}`);
}

export const callCreatePlaylist = (data: IPlayListForm) => {
    return axios.post<IBackendRes<IPlayList>>(`api/v1/playlists/create`, data);
}

export const callUpdatePlaylist = (data: IPlayListForm) => {
    return axios.patch<IBackendRes<string>>(`api/v1/playlists/update/${data.playlist_id}`, data);
}

export const callDeletePlaylist = (playlist_id: string) => {
    return axios.delete<IBackendRes<string>>(`api/v1/playlists/delete/${playlist_id}`);
}