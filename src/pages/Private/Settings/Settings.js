import React, {useEffect} from "react";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import appStyles from "../../../assets/globalStyles";
import {useDispatch, useSelector} from "react-redux";
import {getWalletInfo, getWalletInfoStateNames, WALLET_INFO_STORE_NAME} from "./redux/walletInfoSlice";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "../../../components/Title";
import {PageLoader} from "../../../components/PageLoader";
import SimpleInput from "../../../components/input/SimpleInput";

export const SETTINGS_PATH = "/settings";
export const SETTINGS_MENU_ITEM = "Settings";

export const Settings = () => {
    const globalStyles = appStyles();
    const dispatch = useDispatch();

    const {
        [getWalletInfoStateNames.entity]: walletInfo,
        [getWalletInfoStateNames.loaderIndicator]: loadingWalletInfo
    } = useSelector(state => state[WALLET_INFO_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(SETTINGS_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        if (!walletInfo) {
            dispatch(getWalletInfo());
        }
    }, [dispatch, walletInfo]);

    const getMoneySupply = (info) => {
        // burn addresses:
        // 1. dMsop93F7hbLSA2d666tSPjB2NXSAfXpeU
        // 2. daigDQ7VxAFwmhh59HstA53KYD5a4q81N5
        // 3. dVibZ11CVyiso4Kw3ZLAHp7Wn77dXuvq1d
        return parseInt(info.moneysupply) - 1000000006 - 1000000006 - 1000000006;
    }

    return (
        <>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="stretch">


                <Grid item xs={12}>
                    <Paper className={globalStyles.paperSecondary} style={{height: `100%`, paddingBottom: 0}}>
                        <Grid container>

                            <Grid item xs={12} style={{paddingBottom: `20px`}}>
                                <Title>Server Info</Title>
                            </Grid>
                            {
                                !walletInfo || loadingWalletInfo ? <PageLoader/> :
                                    <Grid item xs={12}>
                                        <Grid container spacing={4}>

                                            <ServerInfoField walletInfo={walletInfo} fieldName={'version'} label="Version"/>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'protocolversion'} label="Protocol version"/>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'paytxfee'} label="Transaction fee"/>
                                            <Grid item xs={12} sm={6}>
                                                <SimpleInput type={'text'}
                                                             label={'Money supply'}
                                                             value={getMoneySupply(walletInfo) + ""}
                                                             disabled={true}
                                                />
                                            </Grid>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'connections'} label="Connections"/>

                                            <ServerInfoField walletInfo={walletInfo} fieldName={'blocks'} label="Blocks"/>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'timeoffset'} label="Time offset"/>

                                            <ServerInfoField walletInfo={walletInfo} fieldName={'testnet'} label="Testnet"/>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'keypoololdest'} label="Key pool oldest"/>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'keypoolsize'} label="Key pool size"/>
                                            <ServerInfoField walletInfo={walletInfo} fieldName={'mininput'} label="Min input"/>

                                            <Grid item xs={12}>
                                                <Title>Difficulty</Title>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <SimpleInput type={'text'}
                                                             label={"Proof of work"}
                                                             value={walletInfo.difficulty['proof-of-work'] + "" || ""}
                                                             disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <SimpleInput type={'text'}
                                                             label={"Proof of stake"}
                                                             value={walletInfo.difficulty['proof-of-stake'] + "" || ""}
                                                             disabled={true}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

const ServerInfoField = ({walletInfo, fieldName, label}) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <SimpleInput type={'text'}
                             label={label}
                             value={walletInfo[fieldName] + ""}
                             disabled={true}
                />
            </Grid>
        </>
    );
}
