import { useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useSingleBookQuery(id, {
    pollingInterval: 20000,
    refetchOnMountOrArgChange: true,
  });
  const { user } = useAppSelector((state) => state.auth);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = (id: string) => {
    if (window.confirm("Want to Delete this Book?")) {
      deleteBook(id);
      toast.success("Book Deleted Successfully");
      navigate("/allbooks");
    }
  };

  type IReview = {
    review: string;
    bookID: string;
  };

  const { register, handleSubmit, reset } = useForm<IReview>();
  const [postReview, { data: reviewData }] = useAddReviewMutation();
  const onSubmit: SubmitHandler<IReview> = (reviewdata: IReview) => {
    const reviewData = { ...reviewdata, id: data?._id };
    postReview(reviewData);
  };
  useEffect(() => {
    if (reviewData?.modifiedCount) {
      reset();
      toast.success("Review Added");
    }
  }, [reviewData, reset]);
  return (
    <div className="p-5 mt-[5rem] ">
      <div className=" flex flex-col justify-between space-y-8 md:space-y-0 md:flex-row md:space-x-4 ">
        <div className=" flex-1 h-full  flex justify-center items-center ">
          <img
            src={data?.image}
            className=" w-full h-full object-contain "
            alt="image"
          />
        </div>
        <div className=" flex-1 ">
          <div>
            <h2 className=" md:text-left text-[2rem] text-center font-bold text-blue-300 uppercase tracking-wider ">
              {data?.title}
            </h2>
            <p className=" text-center md:text-left border-y-2 py-4 items-center ">
              BookID # {data?._id}
            </p>
          </div>
          <h1 className=" text-center font-bold md:text-left">
            Author: {data?.author}
          </h1>
          <div className=" text-center md:text-left border-y-2 py-4 items-center ">
            <span className="  "> Genre: {data?.genre}</span>
          </div>
          <div className=" text-center md:text-left border-y-2 py-4 items-center ">
            <span className="  "> Published : {data?.publicationDate}</span>
          </div>

          <div className=" flex flex-col lg:flex-row lg:gap-4 justify-start items-center  ">
            <div className="flex justify-center  my-4">
              {data?.addedBy === user?.email ? (
                <button
                  className=" w-[15rem] bg-blue-50 hover:bg-blue-200 font-bold text-center rounded-md py-1 px-2 mx-auto"
                  disabled={data?.addedBy === user?.email ? false : true}
                  onClick={() => {
                    toast.success("Book Edited");
                  }}
                >
                  Edit Book
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center  my-4">
              {data?.addedBy === user?.email ? (
                <button
                  className=" w-[15rem] bg-blue-50 hover:bg-blue-200 font-bold text-center rounded-md py-1 px-2 mx-auto"
                  disabled={data?.addedBy === user?.email ? false : true}
                  onClick={() => handleDeleteBook(data?._id)}
                >
                  Delete Book
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="font-bold text-2xl mb-2">Reviews</h3>
            {data?.reviews?.map((review: string, index: number) => (
              <div
                key={index}
                className="flex gap-3 items-center mb-5 bg-gray-100"
              >
                <label className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://github.com/euotiniel.png" />
                  </div>
                </label>
                <p>{review}</p>
              </div>
            ))}
          </div>
          <form
            className="flex gap-5 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control w-full ">
              <input
                type="text"
                {...register("review", { required: true })}
                placeholder=""
                className="input  border-gray-500 w-full h-24 "
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary  my-2"
              disabled={user?.email ? false : true}
            >
              Add Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
