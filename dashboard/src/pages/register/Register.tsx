// import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRegister, fetchRegisterError } from '../../store/actions/AuthAction';

import { useNavigate } from 'react-router-dom';

import { Form } from '../../components/form';
import { InputType } from '../../components/form/inputs/IInputs';

import { Container, Grid, Box } from '@mui/material';
import { Login } from '@mui/icons-material';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { error, message } = useAppSelector(state => state.auth);
    // const navigate = useNavigate();

    function handleRegister(values: any) {
        if (values.password !== values.password_confirm)
            return dispatch(fetchRegisterError({message: "Les mots de passe ne correspondent pas"}));

        dispatch(fetchRegister({
            onSuccess: () => navigate('/login'),
            ...values
        }));
    };

    return (
        <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
                        
            <Grid container justifyContent="center" alignItems="center" >
                
                <Grid item md={5} xs={12} sx={{ borderRadius: "20px", backgroundColor: "#fff", padding: "50px 0px" }}>
                    
                    <Box className="flex-center flex-column">
                        
                        {/* <Box className="flex-center" sx={{
                            maxWidth: { xs: 150, md: 200},
                            paddingBottom: "30px"
                        }}>
                            <img width="100%" src={cashManagerLogo} />
                        </Box> */}
                    
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
                            onSubmit={(values: any) => handleRegister(values)}
                        />

                    </Box>


                </Grid>

            </Grid>

        </Container>
    )
}

export default Register;