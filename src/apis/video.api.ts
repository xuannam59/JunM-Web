import { IBackendRes, IBackendResWithPagination } from "@/types/backend.type";
import axios from "@/configs/axios-customize";
import { IVideo, IVideoForm } from "@/types/video.type";

export const callGetVideos = (query: unknown) => {
    return axios.get<IBackendResWithPagination<IVideo>>(`api/v1/video/all?${query}`);
}

export const callCreateVideo = (data: IVideoForm) => {
    return axios.post<IBackendRes<IVideo>>(`api/v1/video/create`, data);
}

export const callUpdateVideo = (data: IVideoForm) => {
    return axios.patch<IBackendRes<string>>(`api/v1/video/update/${data.video_id}`, data);
}

export const callDeleteVideo = (video_id: string) => {
    return axios.delete<IBackendRes<string>>(`api/v1/video/delete/${video_id}`);
} 