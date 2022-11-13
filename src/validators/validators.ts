export function notEmpty(phrase: string): boolean {
    if("undefined" === typeof phrase.length) {
        return false;
    }

    return phrase.length > 0;
}

export function isNumber(phrase: string): boolean {
    return !isNaN(Number(phrase));
}

export function isMoreThanZero(phrase: string): boolean {
    return isNumber(phrase) && parseFloat(phrase) > 0;
}

export function isPositiveInteger(phrase: string): boolean {
    return isMoreThanZero(phrase) && Number.isInteger(Number(phrase));
}