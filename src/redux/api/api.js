import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { server } from "../../constants/config";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Course", "User", "Payment"],
  
    endpoints: (builder) => ({

      // getDashboardStats: builder.query({
      //   query: () => ({
      //     url: "admin/stats",
      //     credentials: "include",
      //   }),
      //   providesTags: ["Admin"],
      // }),

      getMyProfile: builder.query({
        query: () => ({
          url: "user/me",
          credentials: "include",
        }),
        providesTags: ["User"],
      }),

      // getAllUsers: builder.query({
      //   query: () => ({
      //     url: "user/admin/users",
      //     credentials: "include",
      //   }),
      //   providesTags: ["Admin"],
      // }),

      getAllCourses: builder.query({
        query: ({category = '' ,keyword = ''}) => ({
          url: `course/courses?keyword=${keyword}&category=${category}`,
          credentials: "include",
        }),
        providesTags: ["Course"],
      }),

      addToPlaylist: builder.mutation({
        query: (courseId) => ({
          url: `user/addtoplaylist`,
          credentials: "include",
          method: "POST",
          body: {id: courseId},
        }),
        invalidatesTags: ["User"],
      }),

      removeFromPlaylist: builder.mutation({
        query: (courseId) => ({
          url: `user/removefromplaylist?id=${courseId}`,
          credentials: "include",
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      }),

      createCourse: builder.mutation({
        query: ( formData) => ({
          url: "course/createcourse",
          method: "POST",
          body: formData,
          credentials: "include",
        }),
        invalidatesTags: ["Course"],
      }),

      getCourseLectures: builder.query({
        query: ({courseId}) => ({
          url: `course/courses/${courseId} `,
          credentials: "include",
        }),
        providesTags: ["Course"],
      }),

      deleteCourse: builder.mutation({
        query: ({courseId}) => ({
          url: `course/courses/${courseId} `,
          credentials: "include",
          method: "DELETE",
        }),
        invalidatesTags: ["Course"],
      }),

      updateCourse: builder.mutation({
        query: ( data) => {
            console.log('courseId', data.get('id'));
            const courseId = data.get('id');
          return {
            url: `course/courses/${courseId} `,
            credentials: "include",
            method: "PUT",
            body: data,
          }
        },
          invalidatesTags: ["Course"],
      }),

      deleteLecture: builder.mutation({
        query: ({courseId, lectureId}) => ({
          url: `course/lecture?courseId=${courseId}&lectureId=${lectureId}`,
          credentials: "include",
          method: "DELETE",
        }),
        invalidatesTags: ["Course"],
      }),

     getRazorpayKey : builder.query({
        query: () => ({
          url: `payment/razorpaykey `,
          credentials: "include",
        }),
        providesTags: ["Payment"],
      }),

      getSubscription: builder.query({
        query: () => ({
          url: `payment/subscribe `,
          credentials: "include",
        }),
        providesTags: ["Payment"],
      }),

      paymentVerification: builder.mutation({
        query: (body) => ({
          url: `payment/paymentverification `,
          credentials: "include",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Payment"],
      }),

      cancelSubscription: builder.mutation({
        query: () => ({
          url: `payment/subscribe/cancel `,
          credentials: "include",
          method: "DELETE",
        }),
        invalidatesTags: ["Payment"],
      }),

      // changeRole: builder.mutation({
      //   query: (userId) => ({
      //     url: `user/admin/users/${userId}`,
      //     credentials: "include",
      //     method: "PUT",
      //   }),
      //   invalidatesTags: ["Admin"],
      // }),

      // deleteUser: builder.mutation({
      //   query: (userId) => ({
      //     url: `user/admin/users/${userId}`,
      //     credentials: "include",
      //     method: "DELETE",
      //   }),
      //   invalidatesTags: ["Admin"],
      // }),

      // adminLogin: builder.mutation({
      //   query: (secretKey) => ({
      //     url: `admin/verify`,
      //     method: "POST",
      //     body: { secretKey },
      //     credentials: "include",
      //   }),
      //   invalidatesTags: ["Admin"],
      // }),

      // adminLogout: builder.mutation({
      //   query: () => ({
      //     url: `admin/adminlogout`,
      //     method: "POST",
      //     credentials: "include",
      //   }),
      //   invalidatesTags: ["Admin"],
      // }),

    }),
});




export default api;
export const { 
  useGetMyProfileQuery,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useGetCourseLecturesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useDeleteLectureMutation,
  useGetRazorpayKeyQuery,
  useGetSubscriptionQuery,
  usePaymentVerificationMutation,
  useCancelSubscriptionMutation,
  useAddToPlaylistMutation,
  useRemoveFromPlaylistMutation,
  // useGetDashboardStatsQuery,
  // useGetAllUsersQuery,
  // useChangeRoleMutation,
  // useDeleteUserMutation,
  // useAdminLoginMutation,
  // useAdminLogoutMutation,
 } = api;
