import * as React from "react";
import AuthenticatedScreenRouter from "../AuthenticatedScreenRouter/index";
import LoginScreen from "../../screens/LoginScreen/index";
import { useSelector } from "react-redux";

const AuthenticationRouter = () => {
  const currentUser = useSelector((state) => state.currentUser.value);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);
  return isLoggedIn ? <AuthenticatedScreenRouter /> : <LoginScreen />;
};

export default AuthenticationRouter;
