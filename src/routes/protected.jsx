import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "notiflix/build/notiflix-loading-aio";

import { setUser } from "../redux/slices/userSlice";
import { getGlobal, setGlobal } from "../redux/slices/globalSlice";
import { MemoryClient } from "../utils";

export function PrivateRoute({ children }) {
  const { isLoading, isLoggedIn } = useSelector(getGlobal);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading)
      Loading.pulse("Loading...", {
        backgroundColor: "#f9f9f9",
        svgColor: "#0043ce",
        messageColor: "#0043ce",
      });
    else Loading.remove();

    return () => {
      Loading.remove();
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoggedIn) {
      let user = MemoryClient.get("user");
      if (user) dispatch(setUser(JSON.parse(user)));
      dispatch(setGlobal({ isLoading: false, isLoggedIn: Boolean(user) }));
    }
    return () => {};
  }, []);

  if (isLoading) return null;
  if (isLoggedIn) return children;
  return (
    <Navigate to={{ pathname: "/", state: { from: "location" } }} replace />
  );
}
