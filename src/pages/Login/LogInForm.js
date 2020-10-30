import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import CustomButton from "../../components/CustomButton";
import useStyles from "./LogInStyles";
import {useDispatch, useSelector} from 'react-redux';
import {isFormValid} from "../../utils/formUtils";
import {AUTH_STORE_NAME, incompleteUserStateName, signIn, signInStateNames} from "./redux/loginSlice";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";

const LogInForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        [signInStateNames.loading]: loading,
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
        }
    }, [incompleteUser, navigate])

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
        </>
    );
};

export default LogInForm;
