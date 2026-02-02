import type { Product } from "./product";

export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    isNew?: boolean;
    isBest?: boolean;
    onePlus?: boolean;
    twoPlus?: boolean;
    image: string;
}

export type UpdateProductInput = Partial<CreateProductInput>

export interface AdminProductResponse {
    message: string;
    data: Product;
}

export interface DeleteProductResponse {
    message: string;
    deletedId: number;
}
