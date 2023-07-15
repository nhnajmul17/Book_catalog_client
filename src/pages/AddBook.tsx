import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/bookType";
import { useAddBookMutation } from "../redux/features/books/bookApi";

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAppSelector((state) => state.auth);

  const [addBook, { data }] = useAddBookMutation();
  const onSubmit: SubmitHandler<IBook> = (bookdata: IBook) => {
    const bookData = { ...bookdata, addedBy: user?.email, reviews: [] };
    // addBook(bookData)
    console.log(bookData);
  };
  return (
    <div className="text-start p-10 bg-white">
      <h2 className="text-xl font-bold text-center">Add A New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row">
          <div className="form-control w-full mx-2">
            <label className="label">
              <span className="label-text text-md ">Book Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Book Name"
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
              placeholder="Author Name"
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
              {...register("publicationDate", { required: true })}
              placeholder="15-5-2025"
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
            >
              <option value="Fiction">Fiction</option>
              <option value="History">History</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Novel">Novel</option>
            </select>
          </div>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text text-md">Image</span>
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            placeholder="Put an Image Link"
            className="input  border-gray-500 w-1/2 "
          />
        </div>

        <button type="submit" className="btn  bg-blue-100   my-2">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddBook;
