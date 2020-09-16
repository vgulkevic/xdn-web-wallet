import React, {useEffect, useState} from 'react';
import SimpleInput from "./SimpleInput";

export const NumberInput = ({id, value, validate, setter, validationRes, validationFailText, isFloat, ...props}) => {
    const [showValidationError, setShowValidationError] = useState(false);
    const [validationFailTextVal, setValidationFailTextVal] = useState("");

    useEffect(() => {
        let inputValid = true;

        if (!value) {
            inputValid = false;
            setValidationFailTextVal(validationFailText);
        }

        if (validationRes) {
            validationRes[id] = inputValid;
        }

        let isShowValidationError;
        if (validate && validationRes) {
            isShowValidationError = !inputValid;
        } else {
            isShowValidationError = false;
        }
        setShowValidationError(isShowValidationError);
    }, [validationRes, validate, id, value, validationFailText]);

    return (
        <>
            <SimpleInput
                type={'text'}
                value={value}
                setter={(val) => {
                    if (isFloat) {
                        const numbers = val.replace(/[^\d.]/g, '');
                        if (!numbers) {
                            setter("");
                        } else {
                            setter(numbers);
                        }
                    } else {
                        const numbers = val.replace(/[^\d]/g, '')
                        if (!numbers) {
                            setter("");
                        } else {
                            setter(parseInt(numbers));
                        }
                    }
                }}
                error={showValidationError}
                helperText={showValidationError ? validationFailTextVal : null}
                {...props}
            />
        </>
    );
}