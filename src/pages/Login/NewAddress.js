import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {PageLoader} from "../../components/PageLoader";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_NEW_WALLET_STORE_NAME, createNewWallet, createNewWalletStateNames, resetState} from "./redux/createNewWalletSlice";
import Title from "../../components/Title";
import CustomButton from "../../components/CustomButton";
import SimpleInput from "../../components/input/SimpleInput";
import {setSession} from "../../redux/userSessionSlice";
import {useHistory} from "react-router-dom";
import {useAsync} from "../../hooks/useAsync";

export const NewAddress = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        [createNewWalletStateNames.entity]: newWallet,
        [createNewWalletStateNames.loading]: newWalletCreating
    } = useSelector(state => state[CREATE_NEW_WALLET_STORE_NAME]);

    const [privateKeyConfirmation, setPrivateKeyConfirmation] = useState('');
    const [initialised, setInitialised] = useState(false);

    useAsync(() => new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 100)
    }), setInitialised);

    useEffect(() => {
        if (initialised) {
            dispatch(createNewWallet());
            console.log("create new wallet");
        }
    }, [dispatch, initialised]);

    const newWalletPrivateKey = () => {
        if (newWallet && newWallet.privateKey) {
            return newWallet.privateKey;
        } else {
            return "";
        }
    }

    return (
        <>
            <Grid item xs={12} style={{paddingBottom: '10px'}}>


                <Grid container>

                    <Grid item xs={12}>
                        <Title children={newWalletCreating ? 'Creating your DigitalNote wallet' : 'Your DigitalNote wallet has been created'}/>
                    </Grid>

                    {newWalletCreating ? <PageLoader/> :
                        <>
                            <Grid item xs={12} style={{paddingBottom: '50px'}}>
                                <ul>
                                    <li>Your private key is shown below: Keep it safe! If you lose it, your wallet cannot be recovered.</li>
                                    <li><b>Back up your private key</b>, and once you have it safely backed up, confirm below to access your new wallet.</li>
                                </ul>
                            </Grid>

                            <Grid item xs={12}>
                                <SimpleInput type={'text'}
                                             label={'Your private key'}
                                             value={newWalletPrivateKey()}
                                             disabled={false}
                                             onChange={() => {
                                             }}
                                             onFocus={(e) => {
                                                 e.target.select()
                                             }}
                                />
                            </Grid>

                            <Grid item xs={12} style={{paddingBottom: '30px'}}>
                                <SimpleInput type={'text'}
                                             label={'Copy and paste in the above key to login into your new wallet'}
                                             value={privateKeyConfirmation}
                                             setter={setPrivateKeyConfirmation}
                                />
                            </Grid>

                            <Grid item xs={12} style={{textAlign: 'right'}}>
                                <CustomButton color="primary"
                                              variant="contained"
                                              disabled={newWalletCreating || privateKeyConfirmation !== newWalletPrivateKey()}
                                              onClick={() => {
                                                  // 1. set user token in state and localStorage
                                                  // 2. redirect to dashboard
                                                  // 3. clean newWallet state

                                                  if (newWallet) {
                                                      window.localStorage.setItem('user', JSON.stringify(
                                                          {
                                                              token: newWallet.token
                                                          }
                                                      ));
                                                  }

                                                  dispatch(setSession({
                                                      token: newWallet.token
                                                  }));

                                                  dispatch(resetState());

                                                  history.push('/dashboard');
                                              }}>
                                    Go to my wallet
                                </CustomButton>
                            </Grid>
                        </>
                    }

                </Grid>
            </Grid>
        </>
    );
}
