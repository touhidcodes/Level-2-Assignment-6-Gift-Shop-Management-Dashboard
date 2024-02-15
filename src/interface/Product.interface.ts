export type TProduct = {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  occasion: string;
  recipient?: string;
  category: string;
  theme: string;
  brand: string;
  material: string;
  color: string;
};

export type GiftFilterForm = {
  selectedParam: string;
  paramValue: string;
};
