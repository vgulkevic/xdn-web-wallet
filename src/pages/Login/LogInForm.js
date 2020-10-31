import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import CustomButton from "../../components/CustomButton";
import useStyles from "./LogInStyles";
import {useDispatch, useSelector} from 'react-redux';
import {isFormValid} from "../../utils/formUtils";
import {AUTH_STORE_NAME, incompleteUserStateName, resetState, signIn, signInStateNames, signUpCodeStateNames} from "./redux/loginSlice";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";

const LogInForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        [signInStateNames.loading]: loading,
        [signInStateNames.error]: signInError,
        [incompleteUserStateName]: incompleteUser
    } = useSelector(state => state[AUTH_STORE_NAME])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validate, setValidate] = useState(false)

    const login = async () => {
        setValidate(true)
        if (isFormValid(validationRes)) {
            dispatch(signIn({username: email, password}))
        }
    };

    useEffect(() => {
        if(incompleteUser && incompleteUser.challengeName === 'NEW_PASSWORD_REQUIRED'){
            navigate('/auth/set-password')
            console.log(incompleteUser.challengeName);
        }
    }, [incompleteUser, navigate])

    useEffect(() => {
        if (signInError === "User is not confirmed.") {
            dispatch(resetState({
                resetFunction: (state) => {
                    state[signUpCodeStateNames.entity] = {username:email, password:password};
                    state[signInStateNames.error] = null;
                    return state;
                }
            }));

            navigate("/auth/sign-up/complete");
        }
    }, [dispatch, navigate, signInError, email]);

    const validationRes = {}

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            login();
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
            />
            <CustomButton noWrap onClick={login} fullWidth variant="contained" color="primary"
                          className={classes.button} loading={loading}>Sign in</CustomButton>
            <Link className={classes.forgotPass} to="/auth/forgot">Forgot password</Link>
            <Link className={classes.forgotPass} to="/auth/sign-up">Sign up</Link>
        </>
    );
};

export default LogInForm;
