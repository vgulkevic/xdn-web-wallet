import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import SimpleInput from "../../../components/input/SimpleInput";
import CustomButton from "../../../components/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {enrollForAirdrop, ENROLL_FOR_AIRDROP_STORE_NAME, enrollForAirdropStateNames, resetState} from "./redux/airdropEnrollSlice";
import {notifierSlice} from "../../../components/Notifier/notifierSlice";
import {useHistory} from "react-router-dom";

export const AirdropApply = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ethAddress, setEthAddress] = useState('');
    const [singleAddress, setSingleAddress] = useState('');
    const [multipleAddresses, setMultipleAddresses] = useState('');

    const {
        [enrollForAirdropStateNames.actionCompleted]: completed,
        [enrollForAirdropStateNames.loading]: enrolling
    } = useSelector(state => state[ENROLL_FOR_AIRDROP_STORE_NAME]);

    useEffect(() => {
        if (completed) {
            history.push('/airdrop/success');
            dispatch(resetState({
                resetFunction: (state) => {
                    state[enrollForAirdropStateNames.actionCompleted] = false;
                    return state;
                }
            }));
        }
    }, [dispatch, history, completed]);

    const enrollForAirdropSend = () => {
        if (!ethAddress) {
            dispatch(notifierSlice.actions.enqueueSnackbar(
                {
                    message: 'Please enter your ETH address!',
                    options: {
                        variant: 'error'
                    }
                }
            ));
            return;
        } else if (!singleAddress && !multipleAddresses) {
            dispatch(notifierSlice.actions.enqueueSnackbar(
                {
                    message: 'Please enter your XDN private key!!',
                    options: {
                        variant: 'error'
                    }
                }
            ));
            return;
        }

        dispatch(enrollForAirdrop(
            {
                body: {
                    ethAddress: ethAddress,
                    singleAddress: singleAddress,
                    multipleAddresses: multipleAddresses
                }
            }
        ));
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{paddingBottom: '50px'}}>
                    <SimpleInput
                        type={'text'}
                        label={`Your ETH address`}
                        value={ethAddress}
                        setter={setEthAddress}
                    />
                </Grid>

                <Grid item xs={12} style={{paddingBottom: '50px'}}>
                    <div><b>Enroll a single DigitalNote address:</b></div>
                    <SimpleInput
                        type={'text'}
                        label={`Single private key`}
                        value={singleAddress}
                        setter={setSingleAddress}
                    />
                </Grid>

                <Grid item xs={12}>
                    <div><b>To enroll multiple DigitalNote addresses copy and paste output of `dumpwalletjson` command from your QT wallet. This command is only available on the latest version of the QT:</b></div>
                    <SimpleInput
                        type={'text'}
                        label={`Multiple private keys`}
                        value={multipleAddresses}
                        setter={setMultipleAddresses}
                        multiline
                        rows={5}
                    />
                </Grid>

                <Grid item xs={12} style={{paddingBottom: '50px'}}>

                </Grid>

                <Grid item xs={12} style={{textAlign: 'right'}}>
                    <CustomButton color="secondary"
                                  variant="contained"
                                  noMargin={true}
                                  loading={enrolling}
                                  onClick={() => {
                                      enrollForAirdropSend();
                                  }}>
                        Apply for 2XDN airdrop!
                    </CustomButton>
                </Grid>
            </Grid>
        </>
    );
}
