import { httpClient } from "./axios";
import type {
    AdminProductResponse,
    CreateProductInput,
    DeleteProductResponse,
    UpdateProductInput,
} from "../types/admin.product";

export const createProduct = async (data: CreateProductInput): Promise<AdminProductResponse> => {
    const response = await httpClient.post<AdminProductResponse>("/admin/products", data);
    return response.data;
};

export const updateProduct = async (
    id: number,
    data: UpdateProductInput,
): Promise<AdminProductResponse> => {
    const response = await httpClient.put<AdminProductResponse>(`/admin/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<DeleteProductResponse> => {
    const response = await httpClient.delete<DeleteProductResponse>(`/admin/admin/products/${id}`);
    return response.data;
};
