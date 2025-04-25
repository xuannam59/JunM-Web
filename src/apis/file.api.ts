import axios from "@/configs/axios-customize";
import { IBackendRes } from "@/types/backend.type";

export const callUploadFile = (file: any, folderName: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("folder-name", folderName);
    return axios<IBackendRes<{ fileUpload: string, publicId: string }>>({
        method: 'post',
        url: 'api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const callDeleteFile = (publicId: string) => {
    return axios.delete<IBackendRes<any>>(`api/v1/file/delete/${publicId}`);
}