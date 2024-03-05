/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser, logOut } from "../features/auth/authSlice";
// import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://gift-shop-management-server-omega.vercel.app/api`,
  // baseUrl: `http://localhost:5000/api`,
  // baseUrl: `${
  //   import.meta.env.VITE_ENV === "production"
  //     ? import.meta.env.BASE_URL
  //     : import.meta.env.LOCAL_URL
  // }`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result?.error?.status === 404) {
  //   toast.error(result?.error?.data?.message);
  // }
  // if (result?.error?.status === 403) {
  //   toast.error(result.error.data.message);
  // }

  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch(
      `https://gift-shop-management-server-omega.vercel.app/`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["product", "sales", "coupon"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
