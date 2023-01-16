import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../validators/index";
import InputGroup from "../InputGroup/index";
import { useAlert } from "../../hooks/alert";
import { updateProfileInformations } from "../../http/cash-manager.api";
import { setCurrentUser } from "../../stores/reducers/currentUserReducer";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.value);
  const { alert, setAlert, component: Snackbar } = useAlert();
  const [email, setEmail] = React.useState({
    isError: true,
    value: "",
    errors: validateEmail("email", "").errors,
  });
  const [username, setUsername] = React.useState({
    isError: true,
    value: "",
    errors: validateRequired("username", "").errors,
  });
  const [password, setPassword] = React.useState({
    isError: true,
    value: "",
    errors: validatePassword("password", "").errors,
  });

  React.useEffect(() => {
    if (currentUser) {
      // console.log(currentUser)
      // setEmail({
      //     errors: [],
      //     isError: false,
      //     value: currentUser.user.email
      // })
      // setUsername({
      //     errors: [],
      //     isError: false,
      //     value: currentUser.user.username
      // })
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    let message = "";
    let severity = "error";
    const data = {
      email: email.value,
      password: password.value,
      username: username.value,
    };

    try {
      if (currentUser) {
        // const {data:updatedUser} = await updateProfileInformations(currentUser.token, currentUser.user.id, data)
        // dispatch(
        //     setCurrentUser({
        //         user: updatedUser,
        //         token: currentUser.token
        //     })
        // )
        // message = "Profile updated with success";
        // severity = "success";
      } else {
        throw new Error(
          "current user must be set to perform authenticated http request"
        );
      }
    } catch (error) {
      message =
        "An unexpected error has been encountered, please try again later or contact tour administrator";
    } finally {
      setAlert({
        toggled: true,
        message,
        severity,
      });
    }
  };

  const handleEmail = (email) => {
    const { isValid: emailIsValid, errors: emailValidationsErrors } =
      validateEmail("email", email);
    setEmail({
      isError: !emailIsValid,
      value: email,
      errors: emailValidationsErrors,
    });
  };

  const handlePassword = (password) => {
    const { isValid: passwordIsValid, errors: passwordValidationsErrors } =
      validatePassword("password", password);
    setPassword({
      isError: !passwordIsValid,
      value: password,
      errors: passwordValidationsErrors,
    });
  };

  const handleUsername = (username) => {
    const { isValid: usernameIsValid, errors: usernameValidationsErrors } =
      validateRequired("username", username);
    setUsername({
      isError: !usernameIsValid,
      value: username,
      errors: usernameValidationsErrors,
    });
  };

  const handleCloseAlert = () => {
    setAlert({
      toggled: false,
      message: "",
      severity: "error",
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header} variant="headlineMedium">
          User details
        </Text>

        <InputGroup
          label={"Username"}
          isError={username.isError}
          errors={username.errors}
          value={username.value}
          handleInput={(username) => handleUsername(username)}
        />

        <InputGroup
          label={"Email"}
          isError={email.isError}
          errors={email.errors}
          value={email.value}
          handleInput={(email) => handleEmail(email)}
        />

        <InputGroup
          label={"Password"}
          isError={password.isError}
          errors={password.errors}
          value={password.value}
          handleInput={(password) => handlePassword(password)}
          secureTextEntry={true}
        />

        <Button
          disabled={username.isError || email.isError || password.isError}
          mode="contained"
          onPress={handleSubmit}
        >
          ok
        </Button>
      </View>

      <Snackbar
        onClose={handleCloseAlert}
        toggled={alert.toggled}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  container: {
    width: "100%",
    height: '100%',
    padding: 24,
    backgroundColor: "#FFF",
  },
});

export default ProfileForm;
