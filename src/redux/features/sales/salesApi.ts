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

export const { useGetSalesQuery, useCreateSalesMutation } = salesApi;
