import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { createUser } from "../redux/features/auth/authSlice";

import { toast } from "react-hot-toast";
import { useEffect } from "react";

interface SignupFormInputs {
  // name: string;
  email: string;
  password: string;
}
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, error } = useAppSelector(
    (state) => state.auth
  );

  const onSubmit = (data: SignupFormInputs) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };
  useEffect(() => {
    if (!isLoading && user?.email) {
      navigate("/");
      toast.success("User Created Successfully");
    }
  }, [user, isLoading, navigate]);
  return (
    <div className="h-[500px] flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">SignUp</h2>
      {isError && toast.error(`${error}`)}
      <div className="w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your Name"
              className="input input-bordered w-full "
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div> */}
          <div className="form-control w-full">
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
          <div className="form-control w-full my-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Your Password"
              className="input input-bordered w-full"
            />
          </div>
          {errors.password && <p>{errors.password.message}</p>}
          <button type="submit" className="btn btn-accent w-full my-2">
            Register
          </button>
        </form>
      </div>
      <p>
        Already Have an account?{" "}
        <Link to="/login" className="text-blue-800">
          Login now.
        </Link>
      </p>
    </div>
  );
};

export default Signup;
