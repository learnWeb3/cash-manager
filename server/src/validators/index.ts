export type ValidatorFunction = (key: string, value: any) => ({ errors: string[], valid: boolean })

export const validateRequired: ValidatorFunction = (key: string, value: any) => {
    const errors = [];
    if (!value && value !== 0) {
        errors.push(`missing required value for key ${key}`)
    }
    return {
        errors,
        valid: !errors.length
    }
}

export const validateNumber: ValidatorFunction = (key: string, value: any) => {
    const errors = [];
    if (!value || isNaN(+value)) {
        errors.push(`wrong data format for key ${key}, must be number`)
    }
    return {
        errors,
        valid: !errors.length
    }
}

export const mergeValidate = (key: string, value: any, validators: ValidatorFunction[] = []) => {
    const errors = [];
    for (const validator of validators) {
        const { valid: innerValidatorValid, errors: innerValidatorErrors } = validator(key, value)
        if (!innerValidatorValid) {
            errors.push(...innerValidatorErrors)
        }
    }
    return {
        errors,
        valid: !errors.length
    }
}

export const validateArray: ValidatorFunction = (key: string, value: any) => {
    const errors = [];
    if (!value || Array.isArray(value)) {
        errors.push(`Wrong data format for key ${key}, must be array/list`)
    }
    return {
        errors,
        valid: !errors.length
    }
}

export const validateObject: ValidatorFunction = (key: string, value: any) => {
    const errors = [];
    if (!value || (typeof value !== "object" && !Array.isArray(value))) {
        errors.push(`Wrong data format for key ${key}, must be object`)
    }
    return {
        errors,
        valid: !errors.length
    }
}


export const validateEach = (key: string, value: any, validators: ValidatorFunction[]) => {
    const errors = [];
    for (const item of value) {
        for (const validator of validators) {
            const { valid: innerValidatorValid, errors: innerValidatorErrors } = validator(`${key} item`, item)
            if (!innerValidatorValid) {
                errors.push(...innerValidatorErrors)
            }
        }
    }
    return {
        errors,
        valid: !errors.length
    }
}
