import React from "react";
import {emptyTextValidator} from "../../utils/formUtils";
import useStyles from "./LogInStyles";
import {ValidatingTextInput} from "../../components/input/ValidatingTextInput";

export default function PasswordField({value, setter, validate, validationRes, label, ...props}){
    const classes = useStyles();

    const passwordValidator = (v) => {
        if(emptyTextValidator(v)) {
            return 'Please enter password'
        }

        if (v.length < 8) {
            return 'Minimum password length is 8'
        }
    }

    return (
        <ValidatingTextInput label={label || "Password"}
                             id={'password'}
                             variant="outlined"
                             size="small"
                             value={value}
                             setter={setter}
                             type="password"
                             validator={passwordValidator}
                             validate={validate}
                             validationRes={validationRes}
                             className={classes.inputField}
                             {...props}/>
    )
}