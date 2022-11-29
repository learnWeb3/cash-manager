
export type InputValue = string;

export enum InputType {
	TEXT,
	NAME,
	EMAIL,
	PASSWORD
}

export interface IFormInput {
    label?: string;
	style?: React.CSSProperties;
    type: InputType;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	value?: InputValue;
	error?: string;
	margin?: 'none' | 'dense' | 'normal';
	submited?: boolean;
	style?: React.CSSProperties;
};