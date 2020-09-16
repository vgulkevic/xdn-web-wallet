import React from 'react';
import SimpleInput from "./SimpleInput";

export const SingleTextInput = ({value, validate, validationFailText, validationRes, id, validator, ...props}) => {
    const isInputValid = value !== null && value !== undefined && value !== '';

    if (validationRes)
        validationRes[id] = isInputValid;

    let isShowValidationError;
    if (validate) {
        isShowValidationError = !isInputValid;
    } else {
        isShowValidationError = false;
    }

    return (
        <SimpleInput
            value={value}
            type={'text'}
            error={isShowValidationError}
            helperText={isShowValidationError ? validationFailText : null}
            {...props}/>
    );
};
