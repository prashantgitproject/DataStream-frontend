import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { server } from "../../constants/config";

const adminAPI = createApi({
    reducerPath: "adminAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Admin"],

    endpoints: (builder) => ({

        getDashboardStats: builder.query({
            query: () => ({
              url: "admin/stats",
              credentials: "include",
            }),
            providesTags: ["Admin"],
          }),

          getAllUsers: builder.query({
            query: () => ({
              url: "user/admin/users",
              credentials: "include",
            }),
            providesTags: ["Admin"],
          }),

          changeRole: builder.mutation({
            query: (userId) => ({
              url: `user/admin/users/${userId}`,
              credentials: "include",
              method: "PUT",
            }),
            invalidatesTags: ["Admin"],
          }),
    
          deleteUser: builder.mutation({
            query: (userId) => ({
              url: `user/admin/users/${userId}`,
              credentials: "include",
              method: "DELETE",
            }),
            invalidatesTags: ["Admin"],
          }),
    
          adminLogin: builder.mutation({
            query: (secretKey) => ({
              url: `admin/verify`,
              method: "POST",
              body: { secretKey },
              credentials: "include",
            }),
            invalidatesTags: ["Admin"],
          }),
    
          adminLogout: builder.mutation({
            query: () => ({
              url: `admin/adminlogout`,
              method: "POST",
              credentials: "include",
            }),
            invalidatesTags: ["Admin"],
          }),

        }),
    });

export const {
    useGetDashboardStatsQuery,
    useGetAllUsersQuery,
    useChangeRoleMutation,
    useDeleteUserMutation,
    useAdminLoginMutation,
    useAdminLogoutMutation,
} = adminAPI;

export default adminAPI;
