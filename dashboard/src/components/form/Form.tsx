import { IFormInput, InputType } from './inputs/IInputs';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import { useState } from 'react';
import Input from './inputs/Input';
import NameInput from './inputs/NameInput';

import LoadingButton from '@mui/lab/LoadingButton';

interface IForm {
    initialValues: any,
    inputs: Array<IFormInput>,
    EndText?: React.FC,
    button?: {
        icon?: React.ReactNode,
        text: string
    } 
    onSubmit(values: any): void
}

const Form = ({initialValues, inputs = [], button = undefined, EndText = undefined, onSubmit = () => {}}: IForm) => {

    const [values, setValues] = useState<any>(initialValues);
    const [isSubmit, setSubmited] = useState<boolean>(false);
    // const [isLoading, setLoading] = useState<boolean>(false);
    
    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(values);
        setSubmited(true);
    }

    const handleInputChange = (stateValue: string, index: number) => {
        const obj = Object.assign({}, values);
        obj[Object.keys(values)[index]] = stateValue;
        setValues({...obj});
    }

    return (
 
        <form className="flex-center flex-column" noValidate onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleFormSubmit(event)}>

            {inputs.map((input, idx) => {
                switch(input.type) {

                    case InputType.EMAIL:
                        return (
                            <EmailInput
                                key={idx}
                                label={input.label}
                                name={Object.keys(values)[idx]}
                                type="email"
                                value={values[Object.keys(values)[idx]]}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                submited={isSubmit}
                                style={input?.style}
                            />
                        );
            
                    case InputType.PASSWORD:
                        return (
                            <PasswordInput
                                key={idx}
                                label={input.label}
                                value={values[Object.keys(values)[idx]]}
                                type="password"
                                style={input?.style}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                submited={isSubmit}
                            />
                        );

                    case InputType.TEXT:
                        return (
                            <Input
                                key={idx}
                                label={input.label}
                                value={values[Object.keys(values)[idx]]}
                                type="text"
                                style={input?.style}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                submited={isSubmit}
                            />
                        );
                    
                    case InputType.NAME:
                        return (
                            // <div key={idx}>
                                <NameInput
                                    label={input.label}
                                    value={values[Object.keys(values)[idx]]}
                                    type="text"
                                    style={input?.style}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                    submited={isSubmit}
                                />
                            // </div>
                        );

                    default:
                        break;
                }
            })}

            { EndText && <EndText></EndText> }

            { button && 
                <LoadingButton
                    sx={{
                        backgroundColor: "#1A5075",
                        borderRadius: "7px",
                        color: "white",
                        fontWeight: "bold",
                        marginTop: "7vh",
                        padding: "8px 20px",
                        '&:hover': {
                            backgroundColor: "#2B6F9D",
                        },
                        '&:focus': {
                            backgroundColor: "red",
                        },
                        '&:disabled': {
                            color: "white",
                        },
                        colorInherit:"white"
                        
                    }}
                    loading={false}
                    loadingPosition="start"
                    startIcon={button.icon}
                    type="submit"
                >
                    {button.text}
                </LoadingButton>
            }
        </form>
        
    )
}

export default Form