import { useState } from 'react';

import { InputProps } from './IInputs';

import { FormHelperText, OutlinedInput, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Input = (props: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{marginBottom: "10px", ...props.style}}>
            <h5 style={{fontWeight: "bold"}}>{props.label?.toUpperCase()}</h5>
            <OutlinedInput
                sx={{
                    backgroundColor: "#ECEFF2",
                    borderRadius: "9px",
                    border: "none",
                    height: 45,
                    width: { xs: 280, md: 360 }
                }}
                endAdornment={ props.type == "password" &&
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                value={props.value}
                type={showPassword ? 'text' : props.type}
                onChange={props.onChange}
                error={props.submited && props.error ? true : false}
            />
            {props.submited && 
                <FormHelperText error id="accountId-error">
                    {props.error}
                </FormHelperText>
            }
            
        </FormControl>
        // <div className='flex-column'>
        //     {props.label && 
        //         <label>{props.label}</label>
        //     }            
        //     <input {...props} />
        //     {props.error && 
        //         <div>{props.error}</div>
        //     }
        // </div>
    )
}

export default Input;