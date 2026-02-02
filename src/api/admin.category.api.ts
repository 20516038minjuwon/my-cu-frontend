import { httpClient } from "./axios";
import type {
    CreateCategoryInput,
    UpdateCategoryInput,
    AdminCategoryResponse,
    DeleteCategoryResponse,
} from "../types/admin.category";

export const createCategory = async (data: CreateCategoryInput): Promise<AdminCategoryResponse> => {
    const response = await httpClient.post<AdminCategoryResponse>("/admin/categories", data);
    return response.data;
};

export const updateCategory = async (
    id: number,
    data: UpdateCategoryInput,
): Promise<AdminCategoryResponse> => {
    const response = await httpClient.put<AdminCategoryResponse>(`/admin/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: number): Promise<DeleteCategoryResponse> => {
    const response = await httpClient.delete<DeleteCategoryResponse>(`/admin/categories/${id}`);
    return response.data;
};
