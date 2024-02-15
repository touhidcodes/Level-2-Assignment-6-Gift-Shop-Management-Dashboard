import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { TApiResponse } from "../../interface/response.interface";

const Register = () => {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  type TRegister = {
    username: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TRegister>();

  const onSubmit: SubmitHandler<TRegister> = async (data) => {
    const res: TApiResponse = await registerUser(data);

    if ("error" in res) {
      toast.error(`${res.error.data.errorSources[0].message}`);
    } else if (res.data?.success) {
      toast.success("User Registered Successfully");
      navigate("/login");
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
          <input type="submit" className="btn mt-5" />
        </div>
      </form>
      <div>
        <p className="font-semibold mt-5 text-center">
          <small>
            Already Have An Account?{" "}
            <Link to="/login" className="underline text-blue-950 font-bold">
              Log In Your Account
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Register;
