
export type InputValue = string;

export enum InputType {
	TEXT,
	EMAIL,
	PASSWORD
}

export interface IFormInput {
    label?: string,
    type: InputType
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	value?: InputValue;
	error?: string;
};