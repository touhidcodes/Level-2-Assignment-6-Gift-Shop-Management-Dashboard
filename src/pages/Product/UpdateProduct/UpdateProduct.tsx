/* eslint-disable react-hooks/rules-of-hooks */
import { SubmitHandler, useForm } from "react-hook-form";
import { TProduct } from "../../../interface/Product.interface";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useState } from "react";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { register, handleSubmit } = useForm<TProduct>();

  const onSubmit: SubmitHandler<TProduct> = async (product) => {
    const res = await updateProduct({ productId, product });

    if ("error" in res) {
      toast.error("Something Went Wrong");
    } else if (res.data?.success) {
      toast.success("Product Created Successfully");
      setIsFormDisabled(true);
    }
  };
  return (
    <div className="m-10 px-20 w-full">
      {isLoading && <div>Loading</div>}
      <h1 className="mb-10 text-2xl font-semibold text-center">
        Update Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="space-y-3">
              <p>Product Name:</p>
              <input
                {...register("name", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.name}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Product Quantity:</p>
              <input
                {...register("quantity", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.quantity}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Recipient:</p>
              <input
                {...register("recipient", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.recipient}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Theme:</p>
              <input
                {...register("theme", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.theme}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Material:</p>
              <input
                {...register("material", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.material}
              />
            </div>
          </div>
          {/* 2nd row */}
          <div>
            <div className="space-y-3">
              <p>Product Price:</p>
              <input
                {...register("price", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.price}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Occasion:</p>
              <input
                {...register("occasion", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.occasion}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Category:</p>
              <input
                {...register("category", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.category}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Brand:</p>
              <input
                {...register("brand", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.brand}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Color:</p>
              <input
                {...register("color", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
                defaultValue={product?.data?.color}
              />
            </div>
          </div>
        </div>
        <input type="submit" className="btn mt-5" />
      </form>
    </div>
  );
};

export default UpdateProduct;
