import { customAlphabet } from 'nanoid'

const numbers = '0123456789'
export const nanoIdNumbers = customAlphabet(numbers, 10)
