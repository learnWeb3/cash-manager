export type ValidatorFunction = (key: string, value: any) => ({ errors: string[], valid: boolean })

export const validateRequired: ValidatorFunction = (key, value) => {
    const errors = [];
    if (!value && value !== 0) {
        errors.push(`missing required value for key ${key}`)
    }
    return {
        errors,
        valid: !errors.length
    }
}