import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@prisma/client";
import { APP_URL } from "@/constant";
import { GeneralResponse } from "./type";
import { addSearchParams } from "../services/url";
 
type ProductWithPagination = {
  products: Product[];
  totalCount: number;
  totalPages: number;
};
 
type ProductPaginationParams = {
  page: number;
  limit: number;
  filter?: {
    name?: string;
  };
};
 
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: APP_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      GeneralResponse<ProductWithPagination>,
      ProductPaginationParams
    >({
      query: ({ page, limit, filter }) => {
        const queryParams = addSearchParams([
          { name: "page", value: page.toString() },
          { name: "limit", value: limit.toString() },
          { name: "name", value: filter?.name },
        ]);
 
        return `/api/dashboard/products${queryParams}`;
      },
    }),
  }),
});
 
export const {
  useGetProductsQuery
} = productApi;