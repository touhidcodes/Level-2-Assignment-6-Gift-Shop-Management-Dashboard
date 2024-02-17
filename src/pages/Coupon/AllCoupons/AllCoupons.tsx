import { toast } from "sonner";
import { TCoupon } from "../../../interface/coupon.interface";
import {
  useDeleteCouponMutation,
  useGetAllCouponQuery,
} from "../../../redux/features/coupon/couponApi";

const AllCoupons = () => {
  const { data: couponData, isLoading } = useGetAllCouponQuery(undefined);
  const [deleteCoupon, result] = useDeleteCouponMutation();

  const handleDelete = (id: string) => {
    deleteCoupon(id);

    if (!result.isError) {
      toast.success("Coupon Deleted Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto bg-base-100 mt-10 px-20 w-full">
      {isLoading && <div>Loading</div>}
      <table className="table mt-5 ">
        {/* head */}
        <thead>
          <tr>
            <th>Coupon Code </th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {couponData?.data.map((coupon: TCoupon, index: string) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="font-bold">{coupon?.code}</div>
                </div>
              </td>
              <td>{coupon?.discount} %</td>
              <td>
                <button
                  className="btn btn-xs"
                  onClick={() => {
                    handleDelete(coupon?._id as string);
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
  );
};

export default AllCoupons;
