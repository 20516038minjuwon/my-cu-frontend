import { httpClient } from "./axios";
import type { CategoryTreeResponse, CategoryDetailResponse } from "../types/category";

export const getCategories = async (): Promise<CategoryTreeResponse[]> => {
    const response = await httpClient.get<{ data: CategoryTreeResponse[] }>("/categories");
    return response.data.data;
};

export const getCategoryById = async (id: number): Promise<CategoryDetailResponse> => {
    const response = await httpClient.get<{ data: CategoryDetailResponse }>(`/categories/${id}`);
    return response.data.data;
};
