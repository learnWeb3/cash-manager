import Input from './Input';
import withValidation from '../Validation';

const requiredValidator = (value?: string) => 
    !value ? 'Required' : undefined;

const minLengthValidator = (value?: string) => 
    value && value.length < 8 ? 'Too short' : undefined;

const difficultyValidator = (value?: string) =>
  value && !/^(?=.*\d)(?=.*[A-Za-z]).*$/.test(value)
    ? 'Must contain at least one number and letter'
    : undefined;

const PasswordInput = withValidation(Input, [
    requiredValidator,
    minLengthValidator,
    difficultyValidator
]);

export default PasswordInput;