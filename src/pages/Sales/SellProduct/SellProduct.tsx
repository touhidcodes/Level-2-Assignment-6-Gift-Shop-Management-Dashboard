/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { TProduct } from "../../../interface/Product.interface";
import { useGetProductQuery } from "../../../redux/features/product/productApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSales } from "../../../interface/sales.interface";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";
import { toast } from "sonner";
import moment from "moment";

const SellProduct = () => {
  const { data, refetch } = useGetProductQuery(undefined);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm<TSales>();
  const [createSales, result] = useCreateSalesMutation();
  const [productId, setProductId] = useState<string | null>(null);

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

  const onSubmit: SubmitHandler<TSales> = (data) => {
    // const date = new Date(startDate);

    const date = moment(startDate).format("YYYY-MM-DD");
    const sellDate = parseInt(moment(startDate).format("YYYYMMDD"));

    const salesData = { ...data, date, sellDate, productId };
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
          <div className="">
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
                  <p>Product Name:</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                  />
                </div>
              </div>
              {/* <button type="submit" className="btn mt-5" /> */}
              <div className="flex justify-between mt-5 px-10">
                <button className="btn"> submit</button>
                <div className="btn" onClick={closeModal}>
                  Close
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SellProduct;
