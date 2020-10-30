import React, {useEffect, useState} from 'react';


import CustomButton from "../../components/CustomButton";
import useStyles from "./LogInStyles";
import EmailField from "./EmailField";
import {isFormValid} from "../../utils/formUtils";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_STORE_NAME, forgotPassword, forgotPasswordStateNames} from "./redux/loginSlice";
import {useNavigate} from "react-router-dom";
import {Typography} from "@material-ui/core";

const ForgotPasswordForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [validate, setValidate] = useState(false)

    const {
        [forgotPasswordStateNames.loading]: loading,
        [forgotPasswordStateNames.entity]: done
    } = useSelector(state => state[AUTH_STORE_NAME])

    const handleSubmit = () => {
        setValidate(true)
        if(isFormValid(validationRes)){
            dispatch(forgotPassword({email}))
        }
    };

    useEffect(() => {
        if(done)
            navigate('/auth/forgot/complete')
    }, [done, navigate])

    let validationRes = {}

    return (
        <>
            <Typography style={{marginTop: 16}}>
                Please enter your email to reset password
            </Typography>
            <EmailField value={email} setter={setEmail} validationRes={validationRes} validate={validate}/>
            <CustomButton type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          loading={loading}
                          onClick={handleSubmit}>Continue</CustomButton>
        </>
    );
};

export default ForgotPasswordForm;
