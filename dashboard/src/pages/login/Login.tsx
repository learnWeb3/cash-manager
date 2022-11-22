// import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../store/hooks';
import { fetchLoginDetails } from '../../store/actions/AuthAction';

import { Form } from '../../components/form';
import { InputType } from '../../components/form/inputs/IInputs';

const Login = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const handleLogin = (values: any) => {
        dispatch(
            fetchLoginDetails({
                // onSuccess: () => {
                //     // console.log('/dashbaord');
                //     return;
                // },
                ...values
            })
        );
    };

    return (
        <main>
            <div className="main-container">
                <div className="flex-center flex-column">

                    <h3>Login page</h3>
                    
                    <Form 
                        initialValues={{email: "", password: ""}}
                        inputs={[
                            {
                                label: "Address Email",
                                type: InputType.EMAIL
                            },
                            {
                                label: "Mot de passe",
                                type: InputType.PASSWORD                   
                            }
                        ]}
                        onSubmit={(values: any) => handleLogin(values)}
                    />
                    
                </div>
            </div>

        </main>
    )
}

export default Login;