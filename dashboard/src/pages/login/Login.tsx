import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchLogin, clearAuthError} from '../../store/actions/AuthAction';

import { Form } from '../../components/form';
import { InputType } from '../../components/form/inputs/IInputs';

import { Container, Grid, Box, Snackbar, Alert } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { error, message } = useAppSelector(state => state.auth);

    const handleClose = () => dispatch(clearAuthError())

    const handleLogin = (values: any) => {
        dispatch(
            fetchLogin({
                onSuccess: () => navigate('/dashboard'),
                ...values
            })
        );
    };

    const registerAccount = () => (
        <div className="flex-row" style={{justifyContent: "flex-start", width: "100%"}}>
            <h5 onClick={() => navigate('/register')}>You don't have any account ?</h5>
        </div>
    );

    return (
        <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>

            <Grid container justifyContent="center" alignItems="center" >
                
                <Grid item md={5} xs={12} sx={{ borderRadius: "20px", backgroundColor: "#fff", padding: "50px 0px" }}>
                    
                    <Box className="flex-center flex-column">
                        
                        <Box className="flex-center flex-column" sx={{
                            maxWidth: { xs: 250, md: 300},
                            paddingBottom: { xs: "30px", md: "60px"}
                        }}>
                            <h1>Cash Manager</h1>
                            <span>Epitech Project</span>
                        </Box>
                    
                        <Form
                            initialValues={{email: "", password: ""}}
                            inputs={[
                                {
                                    label: "Address Email",
                                    type: InputType.EMAIL
                                },
                                {
                                    label: "Mot de passe",
                                    type: InputType.PASSWORD,
                                    style: {marginBottom: "0px"}
                                }
                            ]}
                            button={{
                                icon: <LoginIcon />,
                                text: "Connexion"
                            }}
                            EndText={registerAccount}
                            onSubmit={(values: any) => handleLogin(values)}
                        />

                    </Box>

                </Grid>

            </Grid>

            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </Container>
    )
}

export default Login;