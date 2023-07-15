import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookApi";

const BookDetails = () => {
  const { id } = useParams();
  const { data } = useSingleBookQuery(id);
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
            <span className="  "> Published On: {data?.publicationDate}</span>
          </div>

          <div className=" flex flex-col lg:flex-row lg:gap-4 justify-start items-center  ">
            <div className="flex justify-center  my-4">
              <button
                className=" w-[15rem] bg-blue-50 hover:bg-blue-200 font-bold text-center rounded-md py-1 px-2 mx-auto  "
                disabled={data?.status === "Out of Stock" ? true : false}
                // onClick={() => {
                //   dispatch(addToCart(data[0]));
                //   toast.success("Your product added to the cart");
                // }}
              >
                {data?.status !== "Out of Stock" ? (
                  <span> Add to Cart</span>
                ) : (
                  <span>Out Of Stock </span>
                )}
              </button>
            </div>
          </div>
          {/* <p className="font-bold text-[18px]">
            Status: <b className={`text-green-500`}> {data?.status}</b>
          </p>
          <div className="font-semibold">
            Description:{" "}
            <p className="font-normal text-[16px] ">{data?.features}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
