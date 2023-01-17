import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../validators/index";
import InputGroup from "../InputGroup/index";
import { useAlert } from "../../hooks/alert";
import { getUser, updateUser } from "../../http/cash-manager.api";

const ProfileForm = () => {
  const currentUser = useSelector((state) => state.currentUser.value);
  const { alert, setAlert, component: Snackbar } = useAlert();

  const [email, setEmail] = React.useState({
    isError: true,
    value: "",
    errors: validateEmail("email", "").errors,
  });
  const [firstName, setFirstName] = React.useState({
    isError: true,
    value: "",
    errors: validateRequired("firstName", "").errors,
  });
  const [lastName, setLastName] = React.useState({
    isError: true,
    value: "",
    errors: validateRequired("lastName", "").errors,
  });
  const [password, setPassword] = React.useState({
    isError: true,
    value: "",
    errors: validatePassword("password", "").errors,
  });

  const [currentPassword, setCurrentPassword] = React.useState({
    isError: true,
    value: "",
    errors: validatePassword("currentPassword", "").errors,
  });

  React.useEffect(() => {
    if (currentUser) {
      getUser(currentUser.user, currentUser.accessToken).then((data) => {
        setEmail({
          isError: false,
          value: data.user.email.address,
          errors: [],
        });

        setFirstName({
          isError: false,
          value: data.user.name.first,
          errors: [],
        });

        setLastName({
          isError: false,
          value: data.user.name.last,
          errors: [],
        });
      });
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    let message = "";
    let severity = "error";
    const data = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      currentPassword: currentPassword.value,
    };

    try {
      if (currentUser) {
        await updateUser(currentUser.user, currentUser.accessToken, data);
        await getUser(currentUser.user, currentUser.accessToken).then(
          (data) => {
            setEmail({
              isError: false,
              value: data.user.email.address,
              errors: [],
            });

            setFirstName({
              isError: false,
              value: data.user.name.first,
              errors: [],
            });

            setLastName({
              isError: false,
              value: data.user.name.last,
              errors: [],
            });
          }
        );
        message = "Profile updated with success";
        severity = "success";
      } else {
        throw new Error(
          "current user must be set to perform authenticated http request"
        );
      }
    } catch (error) {
      console.log(error)
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

  const handleCurrentPassword = (password) => {
    const { isValid: passwordIsValid, errors: passwordValidationsErrors } =
      validatePassword("password", password);
    setCurrentPassword({
      isError: !passwordIsValid,
      value: password,
      errors: passwordValidationsErrors,
    });
  };

  const handleFirstName = (firstName) => {
    const { isValid: firstNameIsValid, errors: firstNameValidationsErrors } =
      validateRequired("firstName", firstName);
    setFirstName({
      isError: !firstNameIsValid,
      value: firstName,
      errors: firstNameValidationsErrors,
    });
  };

  const handleLastName = (lastName) => {
    const { isValid: lastNameIsValid, errors: lastNameValidationsErrors } =
      validateRequired("lastName", lastName);
    setLastName({
      isError: !lastNameIsValid,
      value: lastName,
      errors: lastNameValidationsErrors,
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
      <ScrollView style={styles.container}>
        <Text style={styles.header} variant="headlineMedium">
          User details
        </Text>

        <InputGroup
          label={"Firstname"}
          isError={firstName.isError}
          errors={firstName.errors}
          value={firstName.value}
          handleInput={(firstName) => handleFirstName(firstName)}
        />

        <InputGroup
          label={"Lastname"}
          isError={lastName.isError}
          errors={lastName.errors}
          value={lastName.value}
          handleInput={(lastName) => handleLastName(lastName)}
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

        <InputGroup
          label={"Current password"}
          isError={currentPassword.isError}
          errors={currentPassword.errors}
          value={currentPassword.value}
          handleInput={(password) => handleCurrentPassword(password)}
          secureTextEntry={true}
        />

        <Button
          disabled={
            firstName.isError ||
            lastName.isError ||
            email.isError ||
            password.isError ||
            currentPassword.isError
          }
          mode="contained"
          onPress={handleSubmit}
        >
          ok
        </Button>
      </ScrollView>

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
    height: "100%",
    padding: 24,
    backgroundColor: "#FFF",
  },
});

export default ProfileForm;
