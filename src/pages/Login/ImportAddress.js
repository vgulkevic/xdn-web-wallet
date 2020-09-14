import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Title from "../../components/Title";
import SimpleInput from "../../components/input/SimpleInput";
import CustomButton from "../../components/CustomButton";
import {useHistory} from "react-router-dom";
import {IMPORT_NEW_ADDRESS_STORE_NAME, importNewAddress, importNewAddressStateNames, resetState} from "./redux/importAddressSlice";
import {useDispatch, useSelector} from "react-redux";
import {setSession} from "../../redux/userSessionSlice";
import {ConfirmationDialogWithTextInput} from "../../components/ConfirmationDialog";

export const ImportAddress = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [privateKey, setPrivateKey] = useState('');

    const {
        [importNewAddressStateNames.entity]: importedAddress,
        [importNewAddressStateNames.loading]: importing,
        [importNewAddressStateNames.actionCompleted]: addressImportCompleted
    } = useSelector(state => state[IMPORT_NEW_ADDRESS_STORE_NAME]);

    useEffect(() => {
        if (addressImportCompleted && importedAddress) {
            if (importedAddress.privateKeyUnsupported) {
                setConfirmationDialogOpen(true);

                dispatch(resetState({
                    resetFunction: (state) => {
                        state[importNewAddressStateNames.actionCompleted] = false;
                        state[importNewAddressStateNames.entity] = null;
                        return state;
                    }
                }));
                return;
            }

            if (importedAddress) {
                window.localStorage.setItem('user', JSON.stringify(
                    {
                        token: importedAddress.token
                    }
                ));
            }

            dispatch(setSession({
                token: importedAddress.token
            }));

            dispatch(resetState());
            history.push('/dashboard');
        }
    }, [dispatch, importedAddress, addressImportCompleted, history]);

    return (
        <>
            <Grid item xs={12} style={{paddingBottom: '10px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Title children={'Import your DigitalNote wallet'}/>
                    </Grid>

                    <Grid item xs={12} style={{paddingBottom: '30px'}}>
                        <SimpleInput type={'text'}
                                     label={'Your private key'}
                                     value={privateKey}
                                     setter={setPrivateKey}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justify="space-between">
                            <Grid item>
                                <CustomButton color="secondary"
                                              variant="contained"
                                              onClick={() => {
                                                  history.push('/set-up');
                                              }}>
                                    Back
                                </CustomButton>
                            </Grid>

                            <Grid item>
                                <CustomButton color="secondary"
                                              variant="contained"
                                              disabled={!privateKey}
                                              loading={importing}
                                              onClick={() => {
                                                  dispatch(importNewAddress({
                                                      body: {
                                                          privateKey: privateKey
                                                      }
                                                  }));
                                              }}>
                                    Import Wallet
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <ConfirmationDialogWithTextInput confirmationRequired={false}
                                             open={confirmationDialogOpen}
                                             title={'Operation not supported'}
                                             description={
                                                 <>You are only allowed to import a private key created in this web wallet. <br/></>
                                             }
                                             applyCallback={()=>setConfirmationDialogOpen(false)}
            />
        </>
    );
}
