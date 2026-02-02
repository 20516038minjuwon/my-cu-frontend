import { httpClient } from "./axios";
import type {
    AdminUser,
    AdminUserListResponse,
    AdminUserPaginationQuery,
    AdminUserResponse,
    CreateUserInput,
    DeleteUserResponse,
    UpdateUserInput,
} from "../types/admin.user";

export const getAdminUsers = async (
    params: AdminUserPaginationQuery,
): Promise<AdminUserListResponse> => {
    const response = await httpClient.get<AdminUserListResponse>("/admin/users", {
        params,
    });
    return response.data;
};

export const getAdminUserById = async (id: number): Promise<AdminUser> => {
    const response = await httpClient.get<{ data: AdminUser }>(`/admin/users/${id}`);
    return response.data.data;
};

export const createAdminUser = async (data: CreateUserInput): Promise<AdminUserResponse> => {
    const response = await httpClient.post<AdminUserResponse>("/admin/users", data);
    return response.data;
};

export const updateAdminUser = async (
    id: number,
    data: UpdateUserInput,
): Promise<AdminUserResponse> => {
    const response = await httpClient.put<AdminUserResponse>(`/admin/users/${id}`, data);
    return response.data;
};

export const deleteAdminUser = async (id: number): Promise<DeleteUserResponse> => {
    const response = await httpClient.delete<DeleteUserResponse>(`/admin/users/${id}`);
    return response.data;
};
