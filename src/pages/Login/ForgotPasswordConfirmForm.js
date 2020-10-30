import React, {useEffect, useState} from 'react';

import {Typography} from "@material-ui/core";

import CustomButton from "../../components/CustomButton";
import useStyles from "./LogInStyles";
import EmailField from "./EmailField";
import {emptyTextValidator, isFormValid} from "../../utils/formUtils";
import PasswordField from "./PasswordField";
import {
    AUTH_STORE_NAME,
    forgotPasswordComplete,
    forgotPasswordCompleteStateNames,
    forgotPasswordStateNames,
} from "./redux/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {unwrapResult} from "@reduxjs/toolkit";
import {ValidatingTextInput} from "../../components/input/ValidatingTextInput";

export const ForgotPasswordConfirmForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validate, setValidate] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [codeDeliveryMedium, setCodeDeliveryMedium] = useState('')

    const {
        [forgotPasswordStateNames.entity]: forgotPassword,
        [forgotPasswordCompleteStateNames.loading]: loading
    } = useSelector(state => state[AUTH_STORE_NAME])

    let validationRes = {}

    useEffect(() => {
        if(!forgotPassword) {
            navigate('/auth/forgot')
        } else {
            setEmail(forgotPassword.email)
            setCodeDeliveryMedium(forgotPassword.delivery)
        }
    }, [forgotPassword, navigate])

    const onClickContinue = () => {
        setValidate(true)
        if(isFormValid(validationRes)){
            dispatch(forgotPasswordComplete({email, code, password}))
                .then(unwrapResult)
                .then(() => {
                    navigate('/')
                })
        }
    }

    return (
        <>
            <EmailField value={email}
                        setter={setEmail}
                        validate={validate}
                        validationRes={validationRes}
                        disabled/>
            <Typography>
                Please check your {codeDeliveryMedium} for confirmation code
            </Typography>
            <ValidatingTextInput
                label="Confirmation code"
                className={classes.inputField}
                variant="outlined"
                size="small"
                name={"code"}
                type="password"
                value={code}
                setter={setCode}
                margin="normal"
                validate={validate}
                validationRes={validationRes}
                validator={emptyTextValidator}
            />
            <PasswordField label="New password"
                           value={password}
                           setter={setPassword}
                           validationRes={validationRes}
                           validate={validate}/>
            <CustomButton type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={onClickContinue}
                          loading={loading}>Continue</CustomButton>
        </>
    );
};
