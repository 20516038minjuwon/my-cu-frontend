export interface Category {
    id: number;
    name: string;
    parentId: number | null;
}

export interface CategoryTreeResponse extends Category {
    children?: CategoryTreeResponse[];
}

export interface CategoryDetailResponse extends Category {
    children?: Category[];
}