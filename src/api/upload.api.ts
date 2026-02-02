import { httpClient } from "./axios.ts";
import type { UploadResponse } from "../types/upload.ts";

export const uploadImage = async (
    file: File,
    folder: string = "products",
): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await httpClient.post<UploadResponse>("/uploads", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteImage = async (url: string): Promise<{ message: string }> => {
    const response = await httpClient.delete<{ message: string }>("/uploads", {
        data: { url }, // DELETE 요청에서 body를 보낼 때는 data 속성 사용
    });
    return response.data;
};
