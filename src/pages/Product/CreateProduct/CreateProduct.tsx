import { SubmitHandler, useForm } from "react-hook-form";
import { TProduct } from "../../../interface/Product.interface";
import { useCreateProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>();

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    const res = await createProduct(data);
    if ("error" in res) {
      toast.error("Something Went Wrong");
    } else if (res.data?.success) {
      toast.success("Product Created Successfully");
      setIsFormDisabled(true);
      navigate("/dashboard/product");
    }
  };

  return (
    <div className="m-10 px-20 w-full">
      <h1 className="mb-10 text-2xl font-semibold text-center">
        Create A Product
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
              />
              <div>
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Product Quantity:</p>
              <input
                {...register("quantity", {
                  required: true,
                })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.quantity && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Recipient:</p>
              <input
                {...register("recipient", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
            </div>
            <div className="mt-5 space-y-3">
              <p>Theme:</p>
              <input
                {...register("theme", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.theme && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Material:</p>
              <input
                {...register("material", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.material && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
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
              />
              <div>
                {errors.price && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Occasion:</p>
              <input
                {...register("occasion", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.occasion && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Category:</p>
              <input
                {...register("category", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.category && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Brand:</p>
              <input
                {...register("brand", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.brand && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p>Color:</p>
              <input
                {...register("color", { required: true })}
                className="input input-bordered input-sm w-full"
                disabled={isFormDisabled}
              />
              <div>
                {errors.color && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <input type="submit" className="btn mt-5" />
      </form>
    </div>
  );
};

export default CreateProduct;
