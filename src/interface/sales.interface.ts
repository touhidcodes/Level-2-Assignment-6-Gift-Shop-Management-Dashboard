import { TProduct } from "./Product.interface";

export type TSales = {
  _id?: string;
  productId: string;
  quantity: string;
  buyer: string;
  date: string;
  sellDate: number;
  coupon?: string;
  discountPrice: number;
  totalPrice: number;
  grandTotal: number;
  seller: string;
  role: string;
  populatedProduct?: TProduct;
  productPrice: string;
};

export type SalesFilterForm = {
  selectedParam: string;
};
