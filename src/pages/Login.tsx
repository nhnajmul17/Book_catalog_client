import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser } from "../redux/features/auth/authSlice";
import { useEffect } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, error } = useAppSelector(
    (state) => state.auth
  );

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    console.log(data);
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (!isLoading && user.email) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);
  return (
    <div className="h-[500px] flex flex-col justify-center items-center py-2">
      <h2 className="text-4xl font-bold">Login</h2>
      {isError && toast.error(`${error}`)}
      <div className="w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              className="input input-bordered w-full "
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-control w-full  my-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Your Password"
              className="input input-bordered w-full"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn btn-accent w-full my-2">
            Login
          </button>
        </form>
      </div>
      <p>
        Don't Have an account?{" "}
        <Link to="/signup" className="text-blue-800">
          Create now.
        </Link>
      </p>
    </div>
  );
};

export default Login;
