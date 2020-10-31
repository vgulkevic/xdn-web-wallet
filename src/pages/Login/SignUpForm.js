import React, {useEffect, useState} from 'react';

import CustomButton from "../../components/CustomButton";

import useStyles from "./LogInStyles";
import {AUTH_STORE_NAME, resetState, signUp, signUpStateNames} from "./redux/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {isFormValid} from "../../utils/formUtils";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import {notifierSlice} from "../../components/Notifier/notifierSlice";
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";

const LogInForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validatePassword, setValidatePassword] = useState('')

    const [validate, setValidate] = useState(false)

    const {
        [signUpStateNames.loading]: creatingUser,
        [signUpStateNames.error]: createUserError,
        [signUpStateNames.actionCompleted]: createdNewUser
    } = useSelector(state => state[AUTH_STORE_NAME])

    useEffect(() => {
        if (createdNewUser) {
            dispatch(resetState({
                resetFunction: (state) => {
                    state[signUpStateNames.actionCompleted] = false;
                    return state;
                }
            }));
            navigate("/auth/sign-up/complete");
        }
    }, [navigate, dispatch, createdNewUser]);

    const validationRes = {}

    const register = async () => {
        setValidate(true);
        if (isFormValid(validationRes)) {
            if (password !== validatePassword) {
                dispatch(notifierSlice.actions.enqueueSnackbar(
                    {
                        message: "Passwords doesn't match",
                        options: {
                            variant: 'error'
                        }
                    }
                ));
            } else {
                dispatch(signUp({username: email, password: password}));
            }
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            register();
        }
    };

    return (
        <>
            <EmailField
                value={email}
                setter={setEmail}
                validationRes={validationRes}
                validate={validate}
                onKeyDown={onKeyDown}
            />
            <PasswordField
                value={password}
                setter={setPassword}
                validationRes={validationRes}
                validate={validate}
                onKeyDown={onKeyDown}
                InputProps={{
                    endAdornment: <InputAdornment position="end"> <Tooltip title={"Min length: 8. Must contain: uppercase letters, lowercase letters, special characters, numbers"} arrow><HelpIcon/></Tooltip> </InputAdornment>
                }}
            />

            <PasswordField
                value={validatePassword}
                setter={setValidatePassword}
                validationRes={validationRes}
                validate={validate}
                onKeyDown={onKeyDown}
                label={"Confirm password"}
            />
            <div>{createUserError}</div>
            <CustomButton noWrap onClick={register} fullWidth variant="contained" color="primary"
                          className={classes.button} loading={creatingUser}>Sign up</CustomButton>
        </>
    );
};

export default LogInForm;