import Input from './Input';
import withValidation from '../Validation';

const requiredValidator = (value?: string) => 
    !value ? 'Required' : undefined;

const minLengthValidator = (value?: string) => 
    value && value.length < 3 ? 'Too short' : undefined;

const difficultyValidator = (value?: string) =>
  value && /^(?=.*\d).+$/.test(value)
    ? 'Contain invalid character(s)'
    : undefined;

const NameInput = withValidation(Input, [
    requiredValidator,
    minLengthValidator,
    difficultyValidator
]);

export default NameInput;