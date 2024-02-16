import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TCoupon } from "../../../interface/coupon.interface";
import { useCreateCouponMutation } from "../../../redux/features/coupon/couponApi";

const CreateCoupon = () => {
  const [createCoupon] = useCreateCouponMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCoupon>();

  const onSubmit: SubmitHandler<TCoupon> = async (data) => {
    const couponData = {
      ...data,
      discount: Number(data.discount),
    };

    try {
      const res = await createCoupon(couponData);

      if ("error" in res) {
        toast.error("Coupon already exists");
      } else if (res.data?.success) {
        toast.success("Coupon Created Successfully");
        reset();
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-72 mx-auto mt-20">
          <div className="space-y-3">
            <p>Coupon Code:</p>
            <input
              {...register("code", { required: true })}
              className="input input-bordered input-sm w-full"
            />
            <div>
              {errors.code && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <p>Percentage:</p>
            <input
              type="number"
              {...register("discount", { required: true, min: 1, max: 99 })}
              className="input input-bordered input-sm w-full"
            />
            <div>
              {errors.discount && (
                <span className="text-red-500">
                  Discount value must be 1 to 99
                </span>
              )}
            </div>
          </div>
          <input type="submit" className="btn mt-5" />
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;
