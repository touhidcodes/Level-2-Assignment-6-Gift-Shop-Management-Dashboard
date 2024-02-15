import { SubmitHandler, useForm } from "react-hook-form";
import { GiftFilterForm } from "../../../interface/Product.interface";

const GiftFilter = () => {
  const { register, handleSubmit, watch } = useForm<GiftFilterForm>();
  const selectedParam = watch("selectedParam");

  const onSubmit: SubmitHandler<GiftFilterForm> = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Filter Parameter:
          <select {...register("selectedParam")}>
            <option value="minPrice">Min Price</option>
            <option value="maxPrice">Max Price</option>
            <option value="occasion">Occasion</option>
            {/* Add more filter parameters as needed */}
          </select>
        </label>
        {selectedParam && (
          <label>
            {selectedParam === "minPrice" || selectedParam === "maxPrice"
              ? "Price"
              : selectedParam}
            :
            <input
              type={
                selectedParam === "minPrice" || selectedParam === "maxPrice"
                  ? "number"
                  : "text"
              }
              {...register("paramValue")}
            />
          </label>
        )}
        <button type="submit">Filter Gifts</button>
      </form>
    </div>
  );
};

export default GiftFilter;
