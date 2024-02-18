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

const baseQuery = fetchBaseQuery({
  // baseUrl: `https://level2assignment5.vercel.app/api`,
  baseUrl: `http://localhost:5000/api`,
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
      `https://level2assignment5.vercel.app/api/auth/refresh-token`,
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
