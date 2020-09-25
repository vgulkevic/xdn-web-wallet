import React, {useEffect, useState} from "react";
import {SingleContainerLayout} from "../../components/layout/SingleContainerLayout";
import Grid from "@material-ui/core/Grid";
import Title from "../../components/Title";
import {useDispatch, useSelector} from "react-redux";
import {GET_XDN_PRICE_STORE_NAME, getGetXdnPrice, getGetXdnPriceStateNames} from "./redux/getXdnPriceSlice";
import {PageLoader} from "../../components/PageLoader";
import {GET_BTC_USD_PRICE_STORE_NAME, getGetBtcUsdPrice, getGetBtcUsdPriceStateNames} from "./redux/getBtcUsdPriceSlice";
import SimpleInput from "../../components/input/SimpleInput";
import {RewardCalculator} from "./RewardCalculator";
import './calculatorStyles.css';

export const MasternodeCalculator = () => {
    const dispatch = useDispatch();

    const [xdnPrice, setXdnPrice] = useState("");
    const [btcUsdPrice, setBtcUsdPrice] = useState("");

    const [masternodePrice, setMasternodePrice] = useState('2000000');

    const [blocksProcessedPerHourMax] = useState('30');
    const [blocksProcessedPerHourEst] = useState('17');

    const [rewardsPerBlock] = useState('100');

    const [blocksProcessedPerDayMax] = useState(parseInt(blocksProcessedPerHourMax) * 24);
    const [blocksProcessedPerDayEst] = useState(parseInt(blocksProcessedPerHourEst) * 24);

    const [rewardsPaidToMNPerDayMax] = useState((parseInt(blocksProcessedPerHourMax) * 24) * rewardsPerBlock);
    const [rewardsPaidToMNPerDayEst] = useState((parseInt(blocksProcessedPerHourEst) * 24) * rewardsPerBlock);

    const [masternodesCount, setMasternodesCount] = useState('80');

    const {
        [getGetXdnPriceStateNames.entity]: bittrexXdnPrice,
        [getGetXdnPriceStateNames.loading]: bittrexXdnPriceLoading
    } = useSelector(state => state[GET_XDN_PRICE_STORE_NAME]);

    const {
        [getGetBtcUsdPriceStateNames.entity]: bittrexBtcUsdPrice,
        [getGetBtcUsdPriceStateNames.loading]: bittrexBtcUsdPriceLoading
    } = useSelector(state => state[GET_BTC_USD_PRICE_STORE_NAME]);

    useEffect(() => {
        dispatch(getGetXdnPrice())
        dispatch(getGetBtcUsdPrice());
    }, [dispatch]);

    useEffect(() => {
        if (bittrexXdnPrice) {
            setXdnPrice(bittrexXdnPrice.lastTradeRate);
        }
    }, [bittrexXdnPrice]);

    useEffect(() => {
        if (bittrexBtcUsdPrice) {
            setBtcUsdPrice(bittrexBtcUsdPrice.lastTradeRate);
        }
    }, [bittrexBtcUsdPrice]);

    const getXdnPriceInUsd = () => {
        try {
            const res = parseFloat(xdnPrice) * parseFloat(btcUsdPrice);
            return isNaN(res) ? "" : res + "";
        } catch (err) {
            return '';
        }
    }

    const getMasternodePriceInUsd = () => {
        try {
            const res = parseFloat(xdnPrice) * parseFloat(btcUsdPrice) * parseFloat(masternodePrice);
            return isNaN(res) ? "" : res;
        } catch (err) {
            return '';
        }
    }

    const convertXdnToUsd = (val) => {
        try {
            return parseInt(val) * getXdnPriceInUsd();
        } catch (err) {
            return ''
        }
    }

    return (
        <>
            <SingleContainerLayout>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Title children={"Masternode ROI Calculator"}/>
                        </Grid>

                        {
                            ((!bittrexXdnPrice || bittrexXdnPriceLoading) || (!bittrexBtcUsdPrice || bittrexBtcUsdPriceLoading)) ? <PageLoader/> :
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <SimpleInput
                                            type={'text'}
                                            label={'XDN price'}
                                            value={xdnPrice}
                                            setter={setXdnPrice}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <SimpleInput
                                            type={'text'}
                                            label={'XDN price (USD)'}
                                            value={getXdnPriceInUsd()}
                                            disabled={true}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <SimpleInput
                                            type={'text'}
                                            label={'BTC price'}
                                            value={btcUsdPrice}
                                            setter={setBtcUsdPrice}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Masternode price'}
                                                    value={masternodePrice}
                                                    setter={setMasternodePrice}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Masternode price (USD)'}
                                                    value={getMasternodePriceInUsd()}
                                                    disabled={true}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <SimpleInput
                                            type={'text'}
                                            label={'Number of all masternodes'}
                                            value={masternodesCount}
                                            setter={setMasternodesCount}
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Title>Rewards</Title>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <u>Theoretical Max</u> that can be earned<br/><br/>
                                                <b>Blocks processed:</b>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Hour'}
                                                    value={blocksProcessedPerHourMax}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Day'}
                                                    value={blocksProcessedPerDayMax}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards per block to MN\'s'}
                                                    value={rewardsPerBlock}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards paid to MN\'s per day'}
                                                    value={rewardsPaidToMNPerDayMax}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Total in USD'}
                                                    value={convertXdnToUsd(rewardsPaidToMNPerDayMax)}
                                                    disabled={true}
                                                />
                                            </Grid>


                                            <RewardCalculator label={''}
                                                              costOfMasternodeInUsd={getMasternodePriceInUsd()}
                                                              blocksPerDay={blocksProcessedPerDayMax}
                                                              masternodesCount={masternodesCount}
                                                              rewardsPaidToMNPerDayMax={rewardsPaidToMNPerDayMax}
                                                              xdnPriceInUsd={getXdnPriceInUsd()}
                                            />

                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <u>Current Estimated</u> revenue earned<br/><br/>
                                                <b>Blocks processed:</b>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Hour'}
                                                    value={blocksProcessedPerHourEst}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Day'}
                                                    value={blocksProcessedPerDayEst}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards per block to MN\'s'}
                                                    value={rewardsPerBlock}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards paid to MN\'s per day'}
                                                    value={rewardsPaidToMNPerDayEst}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Total in USD'}
                                                    value={convertXdnToUsd(rewardsPaidToMNPerDayEst)}
                                                    disabled={true}
                                                />
                                            </Grid>


                                            <Grid item style={{paddingTop: '30px'}}/>

                                            <RewardCalculator label={''}
                                                              costOfMasternodeInUsd={getMasternodePriceInUsd()}
                                                              blocksPerDay={blocksProcessedPerDayEst}
                                                              masternodesCount={masternodesCount}
                                                              rewardsPaidToMNPerDayMax={rewardsPaidToMNPerDayEst}
                                                              xdnPriceInUsd={getXdnPriceInUsd()}
                                            />

                                        </Grid>
                                    </Grid>
                                </>
                        }
                    </Grid>
                </Grid>
            </SingleContainerLayout>
        </>
    );
}
