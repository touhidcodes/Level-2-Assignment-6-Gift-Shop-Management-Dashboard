import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TJWTPayload } from "../../interface/global.interface";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { data }] = useLoginMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      const user = verifyToken(res.data.accessToken) as TJWTPayload;

      dispatch(setUser({ user, token: res.data.accessToken }));
      navigate(`/${user?.role}/welcome`);
    } catch (error: any) {
      toast.error(`${error?.data?.message}`);
    }
  };

  // Handler for Test Login buttons
  const handleTestLogin = async (role: string) => {
    try {
      const username = import.meta.env[`VITE_${role.toUpperCase()}_USERNAME`];
      const password = import.meta.env[`VITE_${role.toUpperCase()}_PASSWORD`];

      const res = await login({ username, password }).unwrap();

      if (!res.isError) {
        toast.success(`${role} logged in successfully`);
      } else {
        toast.error("Something went wrong.");
      }

      const user = verifyToken(res.data.accessToken) as TJWTPayload;

      dispatch(setUser({ user, token: res.data.accessToken }));
      navigate(`/${user?.role}/welcome`);
      setIsModalOpen(false);
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
              type="password"
            />
            <div>
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <input type="submit" className="btn" value="Submit" />
            <button
              type="button"
              className="btn "
              onClick={() => setIsModalOpen(true)}
            >
              Test Login
            </button>
          </div>
        </div>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Test Login</h3>
            <div className="space-y-3">
              <button
                className="btn btn-primary w-full text-white font-semibold"
                onClick={() => handleTestLogin("manager")}
              >
                Login as Manager
              </button>
              <button
                className="btn btn-primary w-full text-white font-semibold"
                onClick={() => handleTestLogin("seller")}
              >
                Login as Seller
              </button>
            </div>
            <button
              className="btn  mt-4 w-full"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
