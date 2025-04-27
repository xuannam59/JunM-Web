import { IBackendRes, IBackendResWithPagination } from "@/types/backend.type";
import axios from "@/configs/axios-customize";
import { IArtist, IArtistFrom } from "@/types/artist.type";

export const callGetArtists = (query: unknown) => {
    return axios.get<IBackendResWithPagination<IArtist>>(`api/v1/artists/all?${query}`);
}

export const callCreateArtist = (data: IArtistFrom) => {
    return axios.post<IBackendRes<IArtist>>(`api/v1/artists/create`, data);
}

export const callUpdateArtist= (data: IArtistFrom) => {
    return axios.patch<IBackendRes<string>>(`api/v1/artists/update/${data.artist_id}`, data);
}

export const callDeleteArtist = (artist_id: string) => {
    return axios.delete<IBackendRes<string>>(`api/v1/artists/delete/${artist_id}`);
}