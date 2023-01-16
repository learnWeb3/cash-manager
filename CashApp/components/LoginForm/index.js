import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { validateEmail, validatePassword } from '../../validators/index';
import InputGroup from '../InputGroup/index';
import { setCurrentUser } from '../../stores/reducers/currentUserReducer';
import { login } from '../../http/cash-manager.api';
import { LocalStorage } from '../../localstorage/index';
import { env } from '../../env/index';
import { useAlert } from '../../hooks/alert';

const LoginForm = () => {

    const { alert, setAlert, component: Snackbar } = useAlert()
    const dispatch = useDispatch()

    const [formData, setFormData] = React.useState({
        email: {
            isError: false,
            value: "",
            errors: []
        },
        password: {
            isError: false,
            value: "",
            errors: []
        }
    })

    React.useEffect(() => {
        handleValidateFormData(formData)
    }, [formData.email.value, formData.password.value])

    const handleSubmit = async () => {

        let message = "";
        let severity = "error"
        const data = {
            email: formData.email.value,
            password: formData.password.value
        }

        try {
            const currentUser = await login(data)
            if (currentUser && currentUser.session) {
                await LocalStorage.storeData(
                    env.LOCAL_STORAGE_CURRENT_USER_KEY,
                    currentUser.session
                )
                dispatch(setCurrentUser(currentUser.session))
                message = "Loged in with success";
                severity = "success";
            } else {
                throw new Error('missing token field in response call')
            }
        } catch (error) {
            message = "An unexpected error has been encountered, please try again later or contact tour administrator"
        } finally {
            setAlert({
                toggled: true,
                message,
                severity
            })
        }
    }

    const handleValidateFormData = (formData) => {
        const {
            isValid: emailIsValid,
            errors: emailValidationsErrors
        } = validateEmail("email", formData.email.value)
        const {
            isValid: passwordIsValid,
            errors: passwordValidationsErrors
        } = validatePassword("password", formData.password.value)

        setFormData({
            ...formData,
            email: {
                ...formData.email,
                isError: !emailIsValid,
                errors: emailValidationsErrors
            },
            password: {
                ...formData.password,
                isError: !passwordIsValid,
                errors: passwordValidationsErrors
            }
        })
    }

    const handleEmail = (email) => {
        const updatedFormData = {
            ...formData,
            email: {
                ...formData.email,
                value: email
            }
        }
        setFormData(updatedFormData)
    }


    const handlePassword = (password) => {
        const updatedFormData = {
            ...formData,
            password: {
                ...formData.password,
                value: password
            }
        }
        setFormData(updatedFormData)
    }

    const handleCloseAlert = () => {
        setAlert({
            toggled: false,
            message: "",
            severity: "error"
        })
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.header} variant="headlineMedium">Sign in</Text>

                <InputGroup
                    label={"Email"}
                    isError={formData.email.isError}
                    errors={formData.email.errors}
                    value={formData.email.value}
                    handleInput={email => handleEmail(email)}
                />


                <InputGroup
                    label={"Password"}
                    isError={formData.password.isError}
                    errors={formData.password.errors}
                    value={formData.password.value}
                    handleInput={password => handlePassword(password)}
                    secureTextEntry={true}
                />

                <Button disabled={formData.email.isError || formData.password.isError} mode="contained" onPress={handleSubmit}>
                    ok
                </Button>

            </View>

            <Snackbar onClose={handleCloseAlert} toggled={alert.toggled} message={alert.message} severity={alert.severity} />

        </>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 24
    },
    container: {
        width: "100%",
        padding: 24
    },
});

export default LoginForm;