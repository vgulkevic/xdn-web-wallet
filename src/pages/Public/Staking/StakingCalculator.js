import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Title from "../../../components/Title";
import {SingleContainerLayout} from "../../../components/layout/SingleContainerLayout";
import {useDispatch, useSelector} from "react-redux";
import {GET_XDN_PRICE_STORE_NAME, getGetXdnPrice, getGetXdnPriceStateNames} from "../redux/getXdnPriceSlice";
import {GET_BTC_USD_PRICE_STORE_NAME, getGetBtcUsdPrice, getGetBtcUsdPriceStateNames} from "../redux/getBtcUsdPriceSlice";
import {PageLoader} from "../../../components/PageLoader";
import SimpleInput from "../../../components/input/SimpleInput";
import {StakingPoolCalculator} from "./StakingPoolCalculator";
import {MyStakingCalculator} from "./MyStakingCalculator";

export const StakingCalculator = () => {
    const dispatch = useDispatch();

    const [xdnPrice, setXdnPrice] = useState("");
    const [btcUsdPrice, setBtcUsdPrice] = useState("");

    const [blocksProcessedPerHourMax] = useState('30');
    const [blocksProcessedPerHourEst] = useState('17');

    const [blocksProcessedPerDayMax] = useState(parseInt(blocksProcessedPerHourMax) * 24);
    const [blocksProcessedPerDayEst] = useState(parseInt(blocksProcessedPerHourEst) * 24);

    const [rewardsPerBlock] = useState('150');

    const [rewardsPaidToStakersPerDayMax] = useState((parseInt(blocksProcessedPerHourMax) * 24) * rewardsPerBlock);
    const [rewardsPaidToStakersPerDayEst] = useState((parseInt(blocksProcessedPerHourEst) * 24) * rewardsPerBlock);

    const [stakingPool] = useState('2000000000');
    const [stakingAmount, setStakingAmount] = useState('2000000');

    const [usdRewardPerOneXdnStackedPerDayMax, setUsdRewardPerOneXdnStackedPerDayMax] = useState('');
    const [usdRewardPerOneXdnStackedPerDayEst, setUsdRewardPerOneXdnStackedPerDayEst] = useState('');

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

    const convertXdnToUsd = (val) => {
        try {
            return parseInt(val) * getXdnPriceInUsd();
        } catch (err) {
            return ''
        }
    }

    const getStakingPoolCost = () => {
        try {
            const res = parseFloat(getXdnPriceInUsd()) * parseInt(stakingPool);
            return (isNaN(res) ? "" : parseFloat(res).toFixed(3) + "");
        } catch (err) {
            return '';
        }
    }

    return (
        <>
            <SingleContainerLayout>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Title children={"Staking ROI Calculator"}/>
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
                                        <Title>Rewards</Title>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                Theoretical Max that can be earned<br/><br/>
                                                <b>Blocks processed:</b>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Hour Max'}
                                                    value={blocksProcessedPerHourMax}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Day Max'}
                                                    value={blocksProcessedPerDayMax}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards per block to Stakers Max'}
                                                    value={rewardsPerBlock}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards paid to Stakers per day Max'}
                                                    value={rewardsPaidToStakersPerDayMax}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Total in USD Max'}
                                                    value={convertXdnToUsd(rewardsPaidToStakersPerDayMax)}
                                                    disabled={true}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                Current Estimated revenue earned<br/><br/>
                                                <b>Blocks processed:</b>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Hour Estimate'}
                                                    value={blocksProcessedPerHourEst}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Blocks Processed Per Day Estimate'}
                                                    value={blocksProcessedPerDayEst}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards per block to Stakers Estimate'}
                                                    value={rewardsPerBlock}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Rewards paid to Stakers per day Estimate'}
                                                    value={rewardsPaidToStakersPerDayEst}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Total in USD Estimate'}
                                                    value={convertXdnToUsd(rewardsPaidToStakersPerDayEst)}
                                                    disabled={true}
                                                />
                                            </Grid>


                                            <Grid item style={{paddingTop: '30px'}}/>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>

                                            <Grid item xs={12}>
                                                <Title>Staking pool</Title>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Staking pool'}
                                                    value={stakingPool}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={`Staking pool cost`}
                                                    value={`$${getStakingPoolCost()}`}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            <Grid item style={{paddingTop: '30px'}}/>
                                        </Grid>
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <StakingPoolCalculator
                                                label={"Max"}
                                                stakingPool={stakingPool}
                                                stakingRewardsPerDay={rewardsPaidToStakersPerDayMax}
                                                rewardPerOneXdnPerDaySetter={setUsdRewardPerOneXdnStackedPerDayMax}
                                                xdnPriceInUsd={getXdnPriceInUsd()}/>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <StakingPoolCalculator
                                                label={"Est"}
                                                stakingPool={stakingPool}
                                                stakingRewardsPerDay={rewardsPaidToStakersPerDayEst}
                                                rewardPerOneXdnPerDaySetter={setUsdRewardPerOneXdnStackedPerDayEst}
                                                xdnPriceInUsd={getXdnPriceInUsd()}/>
                                        </Grid>
                                    </Grid>

                                    <Grid item style={{paddingTop: '30px'}}/>

                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>

                                            <Grid item xs={12}>
                                                <Title>My stake</Title>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SimpleInput
                                                    type={'text'}
                                                    label={'Staking amount'}
                                                    value={stakingAmount}
                                                    setter={setStakingAmount}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <MyStakingCalculator
                                                label={"Max"}
                                                stakingAmount={stakingAmount}
                                                stakingRewardsPerDay={rewardsPaidToStakersPerDayMax}
                                                usdRewardPerOneXdnStackedPerDay={usdRewardPerOneXdnStackedPerDayMax}
                                                xdnPriceInUsd={getXdnPriceInUsd()}/>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <MyStakingCalculator
                                                label={"Est"}
                                                stakingAmount={stakingAmount}
                                                stakingRewardsPerDay={rewardsPaidToStakersPerDayEst}
                                                usdRewardPerOneXdnStackedPerDay={usdRewardPerOneXdnStackedPerDayEst}
                                                xdnPriceInUsd={getXdnPriceInUsd()}/>
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
