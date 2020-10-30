const emptyTextValidator = (s) => {
    if(!s || s === "")
        return `Can't be empty`
}

const numberValidator = (s) => {
    const n = parseInt(s)
    if (isNaN(n))
        return 'Please enter a number'
    if (s < 0) {
        return `Number can't be negative`
    }
}

function isFormValid(fieldValidationResult) {
    for (let key in fieldValidationResult) {
        if (fieldValidationResult.hasOwnProperty(key)) {
            if (fieldValidationResult[key] === false)
                return false;
        }
    }
    return true;
}

const makeErrorText = (validator, value) => validator && validator(value) ? validator(value) ? validator(value) : '' : ''

export {
    isFormValid,
    makeErrorText,
    numberValidator,
    emptyTextValidator
}
