import React, {useEffect, useState} from "react";
import PasswordField from "./PasswordField";
import CustomButton from "../../components/CustomButton";
import useStyles from "./LogInStyles";
import {useDispatch, useSelector} from "react-redux";
import {
    AUTH_STORE_NAME,
    completePassword,
    completePasswordStateNames,
    incompleteUserStateName,
} from "./redux/loginSlice";
import {useNavigate} from "react-router-dom";
import {isFormValid} from "../../utils/formUtils";
import EmailField from "./EmailField";

export default function CompletePasswordForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validate, setValidate] = useState(false)

    const {
        [incompleteUserStateName]: incompleteUser,
        [completePasswordStateNames.loading]: loading,
        [completePasswordStateNames.entity]: user
    } = useSelector(state => state[AUTH_STORE_NAME])

    const validationRes = {}

    const onSetPassword = () => {
        setValidate(true)
        if(isFormValid(validationRes))
            dispatch(completePassword({password}))
    }


    useEffect(() => {
        if(!incompleteUser)
            navigate('/')
        else {
            setEmail(incompleteUser.challengeParam.userAttributes.email)
        }

    }, [incompleteUser, navigate])

    useEffect(() => {
        if(user){
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <EmailField
                validate={validate}
                validationRes={validationRes}
                setter={() => {}} value={email}
                disabled/>
            <PasswordField
                label="New password"
                value={password}
                setter={setPassword}
                validate={validate}
                validationRes={validationRes}/>
            <CustomButton noWrap onClick={onSetPassword} fullWidth variant="contained" color="primary"
                          className={classes.button} loading={loading}>Continue</CustomButton>
        </>
    )
}
