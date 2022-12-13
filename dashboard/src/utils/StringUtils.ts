export const sliceNumber = (number: number, decimals: number = 2) => {
    return Math.ceil(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
}