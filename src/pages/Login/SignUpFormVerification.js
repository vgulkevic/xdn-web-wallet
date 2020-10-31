import React, {useEffect, useState} from 'react';

import CustomButton from "../../components/CustomButton";
import useStyles from "./LogInStyles";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {isFormValid} from "../../utils/formUtils";
import {SingleTextInput} from "../../components/input/SingleTextInput";
import {AUTH_STORE_NAME, resetState, signInStateNames, signUpCode, signUpCodeStateNames} from "./redux/loginSlice";
import {DASHBOARD_PATH} from "../Private/Dashboard/Dashboard";


const SignUpFormVerification = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [code, setCode] = useState("");
    const [showValidation, setShowValidation] = useState(false);

    const {
        [signUpCodeStateNames.entity]: user,
        [signUpCodeStateNames.loading]: signUpCodeLoading,
        [signUpCodeStateNames.error]: signUpCodeError,
        [signUpCodeStateNames.actionCompleted]: signUpCodeCompleted
    } = useSelector(state => state[AUTH_STORE_NAME])

    const validationRes = {
        code: false
    }

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
    }, [navigate, user]);

    useEffect(() => {
        if (signUpCodeCompleted) {
            dispatch(resetState({
                resetFunction: (state) => {
                    state[signUpCodeStateNames.actionCompleted] = false;
                    return state;
                }
            }));
            navigate("/auth");
        }
    }, [dispatch, signUpCodeCompleted, navigate]);

    const confirmSignUp = () => {
        setShowValidation(true);
        if (isFormValid(validationRes)) {
            dispatch(signUpCode({username: user.username, password: user.password, code: code}));
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            confirmSignUp();
        }
    };

    return (
        <>
            <p>We have sent a code to your email. Please enter it below to confirm your account</p>

            <SingleTextInput label="Code"
                             id={'code'}
                             value={code}
                             setter={setCode}
                             validate={showValidation}
                             validationRes={validationRes}
                             validationFailText={'Please enter the code'}
                             onKeyDown={onKeyDown}
            />

            <div>{signUpCodeError}</div>
            <CustomButton noWrap onClick={confirmSignUp} fullWidth variant="contained" color="primary"
                          className={classes.button} loading={signUpCodeLoading}>Confirm sign up</CustomButton>
        </>
    );
};

export default SignUpFormVerification;