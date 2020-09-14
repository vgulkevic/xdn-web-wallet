import React, {useState} from "react";
import CustomButton from "../../components/CustomButton";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {ConfirmationDialogWithTextInput} from "../../components/ConfirmationDialog";

export const LoginSetup = () => {
    const history = useHistory();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    return (
        <>
            <Grid item xs={12}>
                <Grid container justify="space-between">
                    <Grid item>
                        <CustomButton color="secondary"
                                      variant="contained"
                                      onClick={() => {
                                          setConfirmationDialogOpen(true);
                                      }}>
                            Create New Wallet
                        </CustomButton>
                    </Grid>

                    <Grid item>
                        <CustomButton color="secondary"
                                      variant="contained"
                                      onClick={() => {
                                          history.push('/import-address');
                                      }}>
                            Import Wallet
                        </CustomButton>
                    </Grid>
                </Grid>
            </Grid>

            <ConfirmationDialogWithTextInput open={confirmationDialogOpen}
                                             confirmationRequired={true}
                                             cancelCallback={() => setConfirmationDialogOpen(false)}
                                             applyCallback={() => {
                                                 history.push('/new-address');
                                             }}
                                             title={'Important information!'}
                                             description={
                                                 <>
                                                     <ul>
                                                         <li>We do not store or log your private key on our servers</li>
                                                         <li>Backup your private keys</li>
                                                         <li>Do not use this wallet to keep large amounts of DigitalNote! Use <a href='https://digitalnote.org/#wallets'>main client wallet</a> instead for large sums</li>
                                                     </ul>

                                                     <b>Always remember that it is your responsibility to adopt good practices in order to protect your money.</b>
                                                     <br/>
                                                 </>
                                             }
            />
        </>
    );
}
