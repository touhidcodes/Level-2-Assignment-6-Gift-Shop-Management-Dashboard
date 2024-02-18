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

    verifyCoupon: builder.query({
      query: (coupon) => ({
        url: `/coupon/verify-coupon/${coupon}`,
        method: "GET",
      }),
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
  useVerifyCouponQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = salesApi;
