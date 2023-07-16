import WishListCard from "../components/WishListCard";
import { useGetWishListQuery } from "../redux/features/wishlist/wishlistApi";
import { setWishList } from "../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect } from "react";
const WishList = () => {
  const { wishList } = useAppSelector((state) => state.wishlist);
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetWishListQuery(user?.email);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setWishList(data));
  }, [dispatch, data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {wishList?.map((book) => (
        <WishListCard key={book._id} book={book}></WishListCard>
      ))}
    </div>
  );
};

export default WishList;
