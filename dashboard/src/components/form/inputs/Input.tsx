import { InputProps } from './IInputs';

const Input = (props: InputProps) => {
    return (
        <div className='flex-column'>
            {props.label && 
                <label>{props.label}</label>
            }            
            <input {...props} />
            {props.error && 
                <div>{props.error}</div>
            }
        </div>
    )
}

export default Input;