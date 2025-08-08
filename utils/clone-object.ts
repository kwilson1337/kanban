import { omit } from 'lodash-es'

export const cloneObject = (toClone: {}, keysToOmit: string[]) => {
    return omit(toClone, keysToOmit);
}