import React, {useEffect, useState} from "react";
import {SingleTextInput} from "../../../components/input/SingleTextInput";
import Title from "../../../components/Title";
import Grid from "@material-ui/core/Grid";
import CustomButton from "../../../components/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {ACCOUNT_ETH_ADDRESS_STORE_NAME, getEthAddress, getEthAddressStateNames, saveEthAddress, saveEthAddressStateNames} from "./redux/ethAddressSlice";
import {isFormValid} from "../../../utils/formUtils";
import {notifierSlice} from "../../../components/Notifier/notifierSlice";

export const EthAddressEnroll = () => {
    const dispatch = useDispatch();
    const [ethAddress, setEthAddress] = useState('');

    const [showValidation, setShowValidation] = useState(false);

    const {
        [getEthAddressStateNames.entity]: ethAddressFromSlice,
        [getEthAddressStateNames.loaderIndicator]: ethAddressLoading,
        [saveEthAddressStateNames.loading]: saveEthAddressLoading
    } = useSelector(state => state[ACCOUNT_ETH_ADDRESS_STORE_NAME]);

    const validationRes = {
        ethAddress: false,
    }

    useEffect(() => {
        dispatch(getEthAddress());
    }, [dispatch]);

    useEffect(() => {
        if (ethAddressFromSlice) {
            setEthAddress(ethAddressFromSlice);
        }
    }, [ethAddressFromSlice]);

    const save = () => {
        setShowValidation(true);
        if (ethAddress && ethAddress.length !== 42) {
            dispatch(notifierSlice.actions.enqueueSnackbar(
                {
                    message: "Invalid ETH address",
                    options: {
                        variant: 'error'
                    }
                }
            ));
            return;
        }

        if (isFormValid(validationRes)) {
            dispatch(saveEthAddress(ethAddress));
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{paddingTop: `40px`}}>
                    <Title>Super block enroll</Title>
                </Grid>

                <Grid item xs={12}>
                    <Grid container alignContent={'stretch'} alignItems={"flex-end"}>
                        <Grid item xs={10}>
                            <SingleTextInput label="ETH address"
                                             id={'ethAddress'}
                                             value={ethAddress}
                                             setter={setEthAddress}
                                             validate={showValidation}
                                             validationRes={validationRes}
                                             validationFailText={'Please enter a valid ETH address'}/>
                        </Grid>

                        <Grid item xs={2} >
                            <CustomButton variant='contained'
                                          color="primary"
                                          loading={ethAddressLoading || saveEthAddressLoading}
                                          onClick={() => save()}>
                                Save
                            </CustomButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
