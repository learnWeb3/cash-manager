import React from 'react';
import { InputValue, InputProps } from './inputs/IInputs';

type ValidatorType = (value?: InputValue) => string | undefined;

const withValidation = (InputComponent: React.ComponentType<InputProps>, validators: ValidatorType[] = []) => {
	
	return class InputWithValidation extends React.Component<InputProps> {
		render() {
			const { error, value } = this.props;
			const firstInvalidValidator = validators.find(validate => !!validate(value));
			const validationError = firstInvalidValidator && firstInvalidValidator(value);

			return (<InputComponent {...this.props} error={error || validationError} />);
		}
	};
}
export default withValidation;