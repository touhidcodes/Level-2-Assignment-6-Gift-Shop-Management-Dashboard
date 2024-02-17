import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupon: builder.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),

    createCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/coupon",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupon/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useGetAllCouponQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = salesApi;
