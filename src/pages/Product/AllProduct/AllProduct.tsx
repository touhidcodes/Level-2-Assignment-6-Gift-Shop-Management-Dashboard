import { toast } from "sonner";
import { GiftFilterForm, TProduct } from "../../../interface/Product.interface";
import {
  useDeleteMultipleProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../../redux/features/product/productApi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  addDuplicateProductId,
  addProductId,
  removeProductId,
} from "../../../redux/features/product/productSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

const AllProduct = () => {
  const [queryData, setQueryData] = useState<string | undefined>(undefined);
  const [deleteProduct, result] = useDeleteProductMutation();
  const [deleteMultiple] = useDeleteMultipleProductMutation();
  const dispatch: any = useAppDispatch();
  const { data, refetch } = useGetProductQuery(queryData);
  const productIds = useAppSelector((state) => state.product.productIds);
  const { register, handleSubmit, watch } = useForm<GiftFilterForm>();

  const selectedParam = watch("selectedParam");

  const handleDelete = (productId: string) => {
    deleteProduct(productId);

    if (!result.isError) {
      toast.success("Product Deleted Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleMultipleDelete = async () => {
    const res = await deleteMultiple(productIds);

    if ("error" in res) {
      toast.error("Something Went Wrong");
    } else if (res.data?.success) {
      refetch();
      toast.success("Products Deleted Complete");
      dispatch(removeProductId());
    }
  };

  const onSubmit: SubmitHandler<GiftFilterForm> = (data) => {
    const queryString = `${data.selectedParam}=${data.paramValue}`;
    setQueryData(queryString);
  };
  return (
    <div className="w-full p-5 ">
      <div className="space-x-5 my-5 mx-5">
        <div className=" flex gap-10  items-center">
          <button
            className={` ${
              productIds.length
                ? "btn btn-md bg-blue-950 text-white"
                : "btn btn-md"
            }`}
            onClick={() => {
              handleMultipleDelete();
            }}
          >
            Delete All
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mr-5">
              Filter Parameter:
              <select
                {...register("selectedParam")}
                className="select select-bordered select-sm ml-3"
              >
                <option disabled selected>
                  Pick One
                </option>
                <option value="minPrice">Min Price</option>
                <option value="maxPrice">Max Price</option>
                <option value="occasion">Occasion</option>
                <option value="recipient">Recipient</option>
                <option value="category">Category</option>
                <option value="theme">Theme</option>
                <option value="brand">Brand</option>
                <option value="color">Color</option>
              </select>
            </label>
            {selectedParam && (
              <label>
                <input
                  className="input input-bordered input-sm"
                  type={
                    selectedParam === "minPrice" || selectedParam === "maxPrice"
                      ? "number"
                      : "text"
                  }
                  {...register("paramValue")}
                />
              </label>
            )}
            <button type="submit" className="btn ml-5 btn-sm">
              Filter Gifts
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>Select</label>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th> Brand</th>
              <th>Color</th>
              <th>Update</th>
              <th>Duplicate & Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.map((product: TProduct, index: number) => (
              <tr key={index}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => {
                        product._id && dispatch(addProductId(product._id));
                      }}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{product.name}</div>
                  </div>
                </td>
                <td>$ {product.price}</td>
                <td>{product.quantity} pics</td>
                <td>{product.category}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {product.brand}
                  </span>
                </td>
                <td>{product.color}</td>
                <td>
                  <button className="btn btn-xs">
                    <Link to={`/dashboard/product/${product._id!}`}>
                      Update
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      dispatch(addDuplicateProductId(product._id as string));
                    }}
                  >
                    <Link to={`/dashboard/product/duplicate`}>Duplicate</Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      handleDelete(product._id as string);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
