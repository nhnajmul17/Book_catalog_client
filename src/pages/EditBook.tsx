import { useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/bookApi";
import { useForm } from "react-hook-form";
import { IBook } from "../types/bookType";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const { data } = useSingleBookQuery(id);
  const date = data?.publicationDate.split("T")[0];
  const [editBook, { data: editedData }] = useEditBookMutation();

  const { register, handleSubmit } = useForm<IBook>();
  const onSubmit = (editdata: IBook) => {
    const editBookData = {
      ...editdata,
      addedBy: data?.addedBy,
      reviews: data?.reviews,
    };
    const option = {
      id: data?._id,
      data: editBookData,
    };
    editBook(option);
  };
  useEffect(() => {
    if (editedData) {
      toast.success("Edited Book Success");
    }
  }, [editedData]);

  return (
    <div className="text-start p-10 bg-white">
      <h2 className="text-2xl font-bold text-center">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row">
          <div className="form-control w-full mx-2">
            <label className="label">
              <span className="label-text text-md ">Book Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              defaultValue={data?.title}
              className="input border-gray-500 w-full "
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-md ">Author</span>
            </label>
            <input
              type="text"
              {...register("author", { required: true })}
              defaultValue={data?.author}
              className="input border-gray-500 w-full "
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="form-control w-full mx-2">
            <label className="label">
              <span className="label-text text-md ">Published Date</span>
            </label>
            <input
              type="text"
              {...register("publicationDate", {
                required: true,
                valueAsDate: true,
              })}
              defaultValue={date}
              className="input border-gray-500 w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-md">Genre</span>
            </label>
            <select
              {...register("genre", { required: true })}
              className="input border-gray-500 w-full "
              defaultValue={data?.genre}
            >
              <option value="Fiction">Fiction</option>
              <option value="History">History</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Novel">Novel</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="form-control w-full mx-2">
            <label className="label">
              <span className="label-text text-md">Image</span>
            </label>
            <input
              type="text"
              {...register("image", { required: true })}
              defaultValue={data?.image}
              className="input  border-gray-500 w-1/2 "
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn bg-blue-100 my-2 w-1/4">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
