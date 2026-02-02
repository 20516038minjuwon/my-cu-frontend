import type { Pagination } from "./common.ts";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    isNew: boolean;
    isBest: boolean;
    onePlus: boolean;
    twoPlus: boolean;
    categoryId: number;
    category?: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ProductListQuery {
    page?: number;
    limit?: number;
    categoryId?: number;
    isNew?: boolean;
    isBest?: boolean;
    keyword?: string;
    sort?: "latest" | "lowPrice" | "highPrice";
}

export interface ProductListResponse {
    data: Product[];
    pagination: Pagination;
}

export interface ProductDetailResponse {
    data: Product;
}
