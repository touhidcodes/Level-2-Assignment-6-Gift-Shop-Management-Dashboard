import { SubmitHandler, useForm } from "react-hook-form";
import { SalesFilterForm, TSales } from "../../../interface/sales.interface";
import { useGetSalesQuery } from "../../../redux/features/sales/salesApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { addSalesId } from "../../../redux/features/sales/salesSlice";

const SalesHistory = () => {
  const [queryData, setQueryData] = useState<string | undefined>(undefined);
  const { register, handleSubmit } = useForm<SalesFilterForm>();
  const { data, isLoading } = useGetSalesQuery(queryData);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<SalesFilterForm> = (data) => {
    const queryString = `query=${data.selectedParam}`;
    setQueryData(queryString);
  };

  return (
    <div className="overflow-x-auto bg-base-100 mt-10 px-10 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mr-5">
          Filter Parameter:
          <select
            {...register("selectedParam")}
            className="select select-bordered select-sm ml-3"
          >
            <option selected disabled>
              Pick One
            </option>
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </label>
        <button type="submit" className="btn btn-sm ">
          Filter Sales
        </button>
      </form>
      {isLoading && <div>Loading</div>}
      <table className="table mt-5 ">
        {/* head */}
        <thead>
          <tr>
            <th>Product Name </th>
            <th>Buyer Name</th>
            <th>Quantity</th>
            <th> Date</th>
            <th>Grand Total</th>
            <th>Role</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.data.map((product: TSales, index: string) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="font-bold">
                    {product?.populatedProduct?.name}
                  </div>
                </div>
              </td>
              <td>{product.buyer}</td>
              <td>{product.quantity} pcs</td>
              <td>{product.date} </td>
              <td> {product?.grandTotal} $</td>
              <td>
                <span className="badge badge-ghost badge-md">
                  {product?.role}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-xs btn-accent text-blue-950"
                  onClick={() => {
                    dispatch(addSalesId(product?._id as string));
                    console.log(product._id);
                  }}
                >
                  <Link to={`/${user.role}/invoice`}>Download</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
