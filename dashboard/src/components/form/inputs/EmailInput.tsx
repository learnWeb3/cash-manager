import Input from "./Input";
import withValidation from "../Validation";

const requiredValidator = (value?: string) => 
    !value ? "Required" : undefined;

const difficultyValidator = (value?: string) => {
    //eslint-disable-next-line
    return value && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? "Invalid address" : undefined; 
}

const EmailInput = withValidation(Input, [
    requiredValidator,
    difficultyValidator
]);

export default EmailInput;