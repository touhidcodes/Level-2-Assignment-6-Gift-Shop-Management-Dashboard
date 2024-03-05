import { SubmitHandler, useForm } from "react-hook-form";
import { useAdminRegisterMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { TApiResponse } from "../../../interface/response.interface";
import { TUserRole, userRoles } from "../../../interface/global.interface";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";

const CreateUser = () => {
  const user = useAppSelector(useCurrentUser);
  const [registerUser] = useAdminRegisterMutation();

  type TRegister = {
    username: string;
    email: string;
    password: string;
    role: TUserRole;
  };

  const roleOptions = (
    <>
      {user?.role === userRoles.superAdmin && (
        <>
          <option disabled selected>
            Pick One
          </option>
          <option value={userRoles.manager}>Manager</option>
          <option value={userRoles.seller}>Seller</option>
        </>
      )}
      {user?.role === userRoles.manager && (
        <>
          <option disabled selected>
            Pick One
          </option>
          <option value={userRoles.seller}>Seller</option>
        </>
      )}
    </>
  );

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<TRegister>();

  const onSubmit: SubmitHandler<TRegister> = async (data) => {
    console.log(data);

    try {
      const res: TApiResponse = await registerUser(data);
      console.log(res);
      if ("error" in res) {
        toast.error(`${res.error.data.errorSources[0].message}`);
      } else if (res.data?.success) {
        toast.success("User Registered Successfully");
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-72 mx-auto mt-20">
          <div className="space-y-3">
            <p>Username:</p>
            <input
              {...register("username", { required: true })}
              className="input input-bordered input-sm w-full"
            />
            <div>
              {errors.username && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <p>Email:</p>
            <input
              {...register("email", { required: true })}
              className="input input-bordered input-sm w-full"
            />
            <div>
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <p>Password:</p>
            <input
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered input-sm w-full"
            />
            <div>
              {errors.password && (
                <span className="text-red-500">
                  Password is minimum 6 character required
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <p>Role:</p>
            <select
              {...register("role")}
              className="select select-bordered select-sm w-full"
            >
              {roleOptions}
            </select>
          </div>
          <input type="submit" className="btn mt-5" />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
