export const isFormValid = (fieldValidationResult) => {
    for (let key in fieldValidationResult) {
        if (fieldValidationResult.hasOwnProperty(key)) {
            if (fieldValidationResult[key] === false)
                return false;
        }
    }
    return true;
}