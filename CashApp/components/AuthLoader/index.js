import * as React from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../stores/reducers/currentUserReducer";
import { env } from "../../env/index";
import { LocalStorage } from "../../localstorage/index";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const setCurrentUserFromLocalStorage = async () => {
    try {
      const value = await LocalStorage.getData(
        env.LOCAL_STORAGE_CURRENT_USER_KEY
      );
      return value;
    } catch (error) {
      console.error(`error retrieving data from localstorage`);
    }
  };

  React.useEffect(() => {
    setCurrentUserFromLocalStorage().then((value) =>
      dispatch(
        setCurrentUser(
          value ? JSON.parse(value) : null
        )
      )
    );
  });
};

export default AuthLoader;
