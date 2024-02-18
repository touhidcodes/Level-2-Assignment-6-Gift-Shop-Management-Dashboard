import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: (filterQuery) => ({
        url: `/sales?${filterQuery}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),

    getSingleSales: builder.query({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),

    getUserSales: builder.query({
      query: (username) => ({
        url: `/sales/user/${username}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),

    createSales: builder.mutation({
      query: (sales) => ({
        url: "/sales",
        method: "POST",
        body: sales,
      }),
      invalidatesTags: ["sales"],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSingleSalesQuery,
  useGetUserSalesQuery,
  useCreateSalesMutation,
} = salesApi;
