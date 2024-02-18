import { TProduct } from "./Product.interface";

export type TSales = {
  productId: string;
  quantity: string;
  buyer: string;
  date: string;
  sellDate: number;
  coupon?: string;
  populatedProduct?: TProduct;
};

export type SalesFilterForm = {
  selectedParam: string;
};
