import { Container, Grid, Box, Snackbar, Alert } from '@mui/material';
import { Login } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAuthError, fetchRegister, fetchRegisterError } from '../../store/actions/AuthAction';
import { Form } from '../../components/form';
import { InputType } from '../../components/form/inputs/IInputs';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { error, message } = useAppSelector(state => state.auth);

    const handleClose = () => dispatch(clearAuthError())

    function handleRegister(values: any) {
        if (values.password !== values.password_confirm)
            return dispatch(fetchRegisterError({message: "Les mots de passe ne correspondent pas"}));

        dispatch(fetchRegister({
            onSuccess: () => navigate('/login'),
            ...values
        }));
    };

    const loginAccount = () => (
        <div className="flex-row" style={{justifyContent: "flex-start", width: "100%"}}>
            <h5 onClick={() => navigate('/login')}>You have already an account ?</h5>
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
                            initialValues={{firstName: "", lastName: "", email: "", password: "", password_confirm: ""}}
                            inputs={[
                                {
                                    label: "First Name",
                                    type: InputType.NAME
                                },
                                {
                                    label: "Last Name",
                                    type: InputType.NAME
                                },
                                {
                                    label: "Address Email",
                                    type: InputType.EMAIL
                                },
                                {
                                    label: "Mot de passe",
                                    type: InputType.PASSWORD                   
                                },
                                {
                                    label: "Confirmation mot de passe",
                                    type: InputType.PASSWORD                   
                                }
                            ]}
                            button={{
                                icon: <Login />,
                                text: "S'inscrire"
                            }}
                            EndText={loginAccount}
                            onSubmit={(values: any) => handleRegister(values)}
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

export default Register;