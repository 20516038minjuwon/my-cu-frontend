import type { Category } from "./category";

export interface CreateCategoryInput {
    name: string;
    parentId?: number | null;
}

export interface UpdateCategoryInput {
    name?: string;
    parentId?: number | null;
}

export interface AdminCategoryResponse {
    message: string;
    data: Category;
}

export interface DeleteCategoryResponse {
    message: string;
    deletedId: number;
}
