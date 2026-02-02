import { httpClient } from "./axios";
import type {
    ProductListQuery,
    ProductListResponse,
    ProductDetailResponse,
    Product,
} from "../types/product";

export const getProducts = async (params: ProductListQuery): Promise<ProductListResponse> => {
    const response = await httpClient.get<ProductListResponse>("/products", {
        params,
    });
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await httpClient.get<ProductDetailResponse>(`/products/${id}`);
    return response.data.data;
};
