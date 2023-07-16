import { removeItem } from "../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const ReadingList = () => {
  const { readingList } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };
  let content;
  if (readingList?.length) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {readingList?.map((book) => (
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={book?.image} alt="image" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{book.title}</h2>
              <div className="card-actions">
                <button
                  className="btn bg-blue-200"
                  onClick={() => handleRemove(book._id)}
                >
                  Remove From list
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="h-screen">
        <h1 className=" text-4xl text-orange-400 font-bold text-center items-center">
          Nothing added in Reading List
        </h1>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default ReadingList;
