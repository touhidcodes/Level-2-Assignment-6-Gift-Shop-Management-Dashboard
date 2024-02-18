import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { addSalesId } from "../../../redux/features/sales/salesSlice";
import { Link } from "react-router-dom";
import { TSales } from "../../../interface/sales.interface";
import { useGetUserSalesQuery } from "../../../redux/features/sales/salesApi";

const MySales = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserSalesQuery(user.username);

  return (
    <div className="overflow-x-auto bg-base-100 mt-10 px-10 w-full">
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
                  <div className="font-bold">{product?.productName}</div>
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

export default MySales;
