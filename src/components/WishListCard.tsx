import { Link } from "react-router-dom";
import { IBook } from "../types/bookType";

interface IProps {
  book: IBook;
}
const WishListCard = ({ book }: IProps) => {
  const { _id, title, image, author, genre, publicationDate } = book.book;
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
        <div className=" flex justify-center items-center mt-4 ">
          <button
            className="text-[16px] bg-blue-50 hover:bg-blue-200 px-2 rounded-md  font-bold hover:scale-105 transition-all "
            //   onClick={handleWishList}
          >
            Remove From WishList
          </button>
        </div>
      </div>
    </>
  );
};

export default WishListCard;
