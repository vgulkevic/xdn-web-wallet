import React from "react";
import Grid from "@material-ui/core/Grid";
import CustomButton from "../../../components/CustomButton";
import {useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";

export const AirdropMain = () => {
    const history = useHistory();

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{paddingBottom: "50px"}}>
                    <Typography component={"h1"} variant={'h4'} style={{textAlign: 'center'}} color={"primary"}>
                        <b>2XDN AIRDROP</b>
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <CustomButton color="secondary"
                                  variant="contained"
                                  noMargin={true}
                                  onClick={() => {
                                      history.push('/airdrop/apply');
                                  }}>
                        Import QT wallet for 2XDN Airdrop
                    </CustomButton>
                </Grid>
            </Grid>
        </>
    );
}
