import type { UserRole } from "./user.ts";

export interface AdminUser {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export interface AdminUserPaginationQuery {
    page?: number;
    limit?: number;
}

export interface AdminUserListResponse {
    data: AdminUser[];
    pagination: {
        totalUsers: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface CreateUserInput {
    username: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthdate: string;
    role?: UserRole;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthdate?: string;
    role?: UserRole;
}

export interface AdminUserResponse {
    message: string;
    data: AdminUser;
}

export interface DeleteUserResponse {
    message: string;
    deletedId: number;
}
