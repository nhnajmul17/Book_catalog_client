/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { onAuthStateChanged } from "firebase/auth";
import Main from "./layouts/Main";
import { setLoading, setUser } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import auth from "./utils/firebase.config";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
