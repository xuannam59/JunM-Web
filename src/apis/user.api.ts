import { IBackendRes, IBackendResWithPagination } from "@/types/backend.type";
import axios from "@/configs/axios-customize";
import { IListeningHistory, IListeningHistoryForm, IUser, IUserForm } from "@/types/user.type";

export const callGetUsers = (query: unknown) => {
    return axios.get<IBackendResWithPagination<IUser>>(`api/v1/users/all?${query}`);
}

export const callEditUser = (data: IUserForm) => {
    return axios.patch<IBackendRes<string>>(`api/v1/users/update/${data.user_id}`, data);
}

export const callDeleteUser = (user_id: string) => {
    return axios.delete<IBackendRes<string>>(`api/v1/users/delete/${user_id}`);
}

export const callCreateListenHistory = (data: IListeningHistoryForm)=> {
    return axios.post<IBackendRes<string>>('api/v1/users/listening-history', data);
}

export const callGetListenHistory = () => {
    return axios.get<IBackendRes<IListeningHistory>>(`api/v1/users/listening-history`);
}