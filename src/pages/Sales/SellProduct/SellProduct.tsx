/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { TProduct } from "../../../interface/Product.interface";
import { useGetProductQuery } from "../../../redux/features/product/productApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSales } from "../../../interface/sales.interface";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";
import { toast } from "sonner";
import moment from "moment";
import {
  useGetAllCouponQuery,
  useVerifyCouponQuery,
} from "../../../redux/features/coupon/couponApi";
import { TCoupon } from "../../../interface/coupon.interface";
import { discountCalculator } from "../../../utils/discountCalculator";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";

const SellProduct = () => {
  const user = useAppSelector(useCurrentUser);
  const { data, refetch } = useGetProductQuery(undefined);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, reset, watch } = useForm<TSales>();
  const [createSales, result] = useCreateSalesMutation();
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [verifyCouponData, setVerifyCouponData] = useState("");
  const { data: couponData } = useGetAllCouponQuery(undefined);
  const { data: verifiedCouponData } = useVerifyCouponQuery(verifyCouponData, {
    skip: !verifyCouponData,
  });

  const selectedValue = watch("coupon");
  const productQuantity = watch("quantity");

  useEffect(() => {
    if (selectedValue && selectedValue !== undefined) {
      setVerifyCouponData(selectedValue);
    }
  }, [selectedValue]);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      refetch();
    }
  };

  const totalPrice = Number(productPrice) * Number(productQuantity);
  const discount = discountCalculator(totalPrice, verifiedCouponData);
  const discountPrice = discount ? discount : 0;
  const grandTotal = Number(
    (discountPrice ? totalPrice - discountPrice : totalPrice).toFixed(2)
  );

  const onSubmit: SubmitHandler<TSales> = (data) => {
    const date = moment(startDate).format("YYYY-MM-DD");
    const sellDate = parseInt(moment(startDate).format("YYYYMMDD"));

    const salesData = {
      ...data,
      date,
      sellDate,
      productId,
      totalPrice,
      discountPrice,
      grandTotal,
      seller: user.username,
      role: user.role,
      productName,
      productPrice,
    };
    createSales(salesData);

    if (!result.isError) {
      toast.success("Product created successfully");
      reset();
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="m-10 px-20 w-full">
      <div className="overflow-x-auto bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data.map((product: TProduct, index: string) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{product.name}</div>
                  </div>
                </td>
                <td>$ {product.price}</td>
                <td>{product.quantity} pics</td>
                <td>
                  <button
                    className="btn btn-md"
                    onClick={() => {
                      showModal();
                      setProductId(product._id as string);
                      setProductPrice(product?.price);
                      setProductName(product?.name);
                    }}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <div className="grid justify-center">
              <div className="space-y-3 w-full">
                <p>Product Quantity:</p>
                <input
                  {...register("quantity", { required: true })}
                  className="input input-bordered input-sm "
                />
              </div>
              <div className="space-y-3 w-full">
                <p>Buyer Name:</p>
                <input
                  {...register("buyer", { required: true })}
                  className="input input-bordered input-sm"
                />
              </div>
              <div className="space-y-3 w-full">
                <p>Date:</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  className="input input-bordered input-sm"
                />
              </div>
              <div className="space-y-3 w-full mt-2">
                <p>Apply Coupon:</p>
                <select
                  {...register("coupon")}
                  className="select select-bordered select-sm w-full"
                >
                  <option disabled selected value={undefined}>
                    Pick One
                  </option>
                  {couponData?.data.map((coupon: TCoupon) => (
                    <option value={coupon?.code} key={coupon?.code}>
                      {coupon?.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-4 mt-5">
                <h4>
                  <span className="font-bold"> Total Price: </span>
                  <span>{totalPrice || 0} $</span>
                </h4>

                <h4>
                  <span className="font-bold">Discount: </span>
                  <span>{discountPrice || 0} $</span>
                </h4>
                <h4>
                  <span className="font-bold"> Grand Total: </span>
                  <span>{grandTotal || 0} $</span>
                </h4>
              </div>
            </div>

            <div className="flex justify-between mt-5 px-10 ">
              <button className="btn btn-success text-white">
                Sell Product
              </button>
              <div className=" btn btn-error text-white" onClick={closeModal}>
                Close
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SellProduct;
