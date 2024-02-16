import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { data }] = useLoginMutation();

  if (data) {
    toast.success("User logged in successfully");
  }

  type TLogin = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      const credentials = {
        username: data.username,
        password: data.password,
      };
      const res = await login(credentials).unwrap();

      if (!res.isError) {
        toast.success("User logged in successfully");
      } else {
        toast.error("Something went wrong.");
      }

      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));
      navigate("/admin/welcome");
    } catch (error: any) {
      toast.error(`${error?.data?.message}`);
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
            <p>Password:</p>
            <input
              {...register("password", { required: true })}
              className="input input-bordered input-sm w-full"
            />
            <div>
              {errors.password && (
                <span className="text-red-500">This field is required</span>
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
            <Link to="/register" className="underline text-blue-950 font-bold">
              Create An Account
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Login;
