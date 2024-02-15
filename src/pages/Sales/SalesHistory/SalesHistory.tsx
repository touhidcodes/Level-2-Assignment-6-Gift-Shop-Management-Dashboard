import { SubmitHandler, useForm } from "react-hook-form";
import { SalesFilterForm, TSales } from "../../../interface/sales.interface";
import { useGetSalesQuery } from "../../../redux/features/sales/salesApi";
import { useState } from "react";

const SalesHistory = () => {
  const [queryData, setQueryData] = useState<string | undefined>(undefined);
  const { register, handleSubmit } = useForm<SalesFilterForm>();
  const { data, isLoading } = useGetSalesQuery(queryData);

  const onSubmit: SubmitHandler<SalesFilterForm> = (data) => {
    const queryString = `query=${data.selectedParam}`;
    setQueryData(queryString);
  };

  return (
    <div className="overflow-x-auto bg-base-100 mt-10 px-20 w-full">
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
            <th>Brand</th>
            <th> Date</th>
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
              <td>
                <span className="badge badge-ghost badge-sm">
                  {product?.populatedProduct?.brand}
                </span>
              </td>
              <td>{product.date} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
