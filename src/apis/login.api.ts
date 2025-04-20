import { IGetAccountRes, ILoginForm, ILoginRes, IRegisterForm, IRegisterRes } from "@/types/Auth";
import axios from "@/configs/axios-customize";
import { IBackendRes } from "@/types/backend.type";

export const callLogin = async (data: ILoginForm) => {
    return axios.post<IBackendRes<ILoginRes>>("api/v1/auths/login", data);
}

export const callRegister = async (data: IRegisterForm) => {
    return axios.post<IBackendRes<IRegisterRes>>("api/v1/auths/register", data);
}

export const callGetAccount = async () => {
    return axios.get<IBackendRes<IGetAccountRes>>("api/v1/auths/account");
}

export const callLogout = async () => {
    return axios.get<IBackendRes<string>>("api/v1/auths/logout");
}