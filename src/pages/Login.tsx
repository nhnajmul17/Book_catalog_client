/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}
const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    // dispatch(SigninUser({ email: data.email, password: data.password })).then(
    //     navigate(from, { replace: true })
    // )
  };
  return (
    <div className="h-[500px] flex flex-col justify-center items-center py-2">
      <h2 className="text-4xl">Login</h2>
      {/* {isError ? <p className="text-red-500">{error}</p> : ""} */}
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
          </div>
          <button type="submit" className="btn btn-accent w-full my-2">
            Submit
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
