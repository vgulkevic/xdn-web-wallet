import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {ENROLL_FOR_AIRDROP_STORE_NAME, enrollForAirdropStateNames, resetState} from "./redux/airdropEnrollSlice";
import {useDispatch, useSelector} from "react-redux";

export const AirdropSuccess = () => {
    const dispatch = useDispatch();

    const {
        [enrollForAirdropStateNames.entity]: result
    } = useSelector(state => state[ENROLL_FOR_AIRDROP_STORE_NAME]);

    useEffect(() => {
        return () => {
            dispatch(resetState());
        }
    }, [dispatch]);

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{paddingBottom: "50px"}}>
                    <Typography component={"h1"} variant={'h4'} style={{textAlign: 'center'}} color={"primary"}>
                        <b>2XDN AIRDROP</b>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    You have successfully enrolled <b>{result ? result.enrolledAddresses : 0} addresses</b> for the 2XDN airdrop! Thank you for supporting XDN!
                </Grid>

                {
                    (result && result.invalidPrivateKeys && result.invalidPrivateKeys.length > 0) &&
                    <>
                        <Grid item xs={12} style={{paddingTop: "20px"}}>
                            Some of the provided private keys <b>were invalid or we failed</b> to enroll them. Please verify and try again later.
                        </Grid>

                        <Grid item xs={12} style={{paddingTop: '20px', paddingBottom: '20px'}}>

                            <Typography variant={'h5'}>
                                Invalid private keys:
                            </Typography>

                            {
                                result.invalidPrivateKeys.map((failedPrivateKey) => {
                                    return <div key={failedPrivateKey}>{failedPrivateKey}</div>
                                })
                            }
                        </Grid>
                    </>
                }
                {
                    (result && result.privateKeysFailedDueToSystemError && result.privateKeysFailedDueToSystemError.length > 0) &&
                    <>
                        <Grid item xs={12} style={{paddingTop: '20px', paddingBottom: '20px'}}>

                            <Typography variant={'h5'}>
                                Private keys failed to enroll due to system error:
                            </Typography>

                            {
                                result.privateKeysFailedDueToSystemError.map((failedPrivateKey) => {
                                    return <div key={failedPrivateKey}>{failedPrivateKey}</div>
                                })
                            }
                        </Grid>
                    </>
                }
            </Grid>
        </>
    );
}
