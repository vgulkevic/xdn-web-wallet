import React from "react";
import useStyles from "./LogInStyles";
import {ValidatingTextInput} from "../../components/input/ValidatingTextInput";

export default function EmailField({value, setter, validate, validationRes, ...props}) {
    const classes = useStyles();
    const emailValidator = (val) => {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(val).toLowerCase())) {
            return 'Please enter correct email'
        }
    }
    return (
        <ValidatingTextInput label="Email"
                             id={'email'}
                             variant="outlined"
                             size="small"
                             value={value}
                             setter={setter}
                             validator={emailValidator}
                             validate={validate}
                             validationRes={validationRes}
                             className={classes.inputField}
                             {...props}
        />
    )
}
