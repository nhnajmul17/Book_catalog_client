import { Link } from "react-router-dom";
import { IBook } from "../types/bookType";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useAddwishlistMutation } from "../redux/features/wishlist/wishlistApi";
import { toast } from "react-hot-toast";
import { setReadingList } from "../redux/features/wishlist/wishlistSlice";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const { _id, title, image, author, genre, publicationDate } = book;
  const { user } = useAppSelector((state) => state.auth);
  const [addwishlist] = useAddwishlistMutation();
  const { wishList } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  const handleWishList = () => {
    const wishlistData = { book: book, email: user?.email };
    const exist = wishList.find((book) => book?.book._id === _id);
    if (exist) {
      toast.error("Book Already in Wish List");
    } else {
      addwishlist(wishlistData);
      toast.success("Added In Wish List");
    }
  };

  const handleReadingList = () => {
    dispatch(setReadingList(book));
  };

  return (
    <>
      <div className="mx-auto w-[22rem] rounded-md border-2 p-2 shadow-xl cursor-pointer hover:-translate-y-2 transition-all ">
        <Link to={`/book-details/${_id}`}>
          <div>
            <figure className="  h-[15rem] w-full  border-b-2  ">
              <img
                src={image}
                className=" w-full  h-full object-contain "
                alt="name"
              />
            </figure>
            <div className="  flex flex-col justify-between my-2 ">
              <div className=" flex justify-center items-center ">
                <h2 className=" font-bold text-[15px] md:text-[24px]  ">
                  {title}
                </h2>
              </div>
              <div className=" flex justify-center items-center ">
                <h2 className="  text-[15px] md:text-[18px]  ">
                  <span className="font-medium">Author:</span> {author}
                </h2>
              </div>
              <div className=" flex justify-center items-center ">
                <h2 className="  text-[15px] md:text-[15px]  ">
                  <span className="font-medium">Genre:</span> {genre}
                </h2>
              </div>
              <div className=" flex justify-center items-center ">
                <h2 className="  text-[15px] md:text-[15px]  ">
                  <span className="font-medium">Publication Date:</span>{" "}
                  {publicationDate.split("T")[0]}
                </h2>
              </div>
            </div>
          </div>
        </Link>
        {user?.email && (
          <div className=" flex flex-row justify-center items-center mt-4 ">
            <button
              className="text-[16px] bg-blue-50 hover:bg-blue-200 px-2 rounded-md  font-bold hover:scale-105 transition-all mx-2"
              onClick={handleWishList}
              disabled={user?.email ? false : true}
            >
              Add To WishList
            </button>
            <button
              className="text-[16px] bg-blue-50 hover:bg-blue-200 px-2 rounded-md  font-bold hover:scale-105 transition-all mx-2 "
              onClick={handleReadingList}
              disabled={user?.email ? false : true}
            >
              Add To Reading List
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookCard;
