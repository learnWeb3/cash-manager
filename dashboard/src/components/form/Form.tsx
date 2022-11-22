import { IFormInput, InputType } from './inputs/IInputs';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import { useState } from 'react';
import Input from './inputs/Input';

interface IForm {
    initialValues: any,
    inputs: Array<IFormInput>,
    onSubmit(values: any): void
}

const Form = ({initialValues, inputs = [], onSubmit}: IForm) => {

    const [values, setValues] = useState<any>(initialValues);
    
    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.elements);
        onSubmit(values);
    }

    const handleInputChange = (stateValue: string, index: number) => {
        const obj = Object.assign({}, values);
        obj[Object.keys(values)[index]] = stateValue;
        setValues({...obj});
    }

    return (
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleFormSubmit(event)}>
            {inputs.map((input, idx) => {
                switch(input.type) {

                    case InputType.EMAIL:
                        return (
                            <div key={idx}>
                                <EmailInput
                                    label={input.label}
                                    name={Object.keys(values)[idx]}
                                    value={values[Object.keys(values)[idx]]}
                                    type="email"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                />
                            </div>
                        )
            
                    case InputType.PASSWORD:
                        return (
                            <div key={idx}>
                                <PasswordInput
                                    label={input.label}
                                    value={values[Object.keys(values)[idx]]}
                                    type="password"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                />
                            </div>
                        )

                    case InputType.TEXT:
                        return (
                            <div key={idx}>
                                <Input
                                    label={input.label}
                                    value={values[Object.keys(values)[idx]]}
                                    type="text"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, idx)}
                                />
                            </div>
                        )

                    default:
                        break;
                }
                return (
                    <div key={idx}> {input.label} </div>
                )
            })}

            <button type="submit">
                Valider
            </button>
        </form>
    )
}

export default Form