import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import SimpleInput from "../../../components/input/SimpleInput";

export const StakingPoolCalculator = ({label, stakingRewardsPerDay, stakingPool, xdnPriceInUsd, rewardPerOneXdnPerDaySetter}) => {
    const [xdnRewardEstimatePerOneXdnStacked, setXdnRewardEstimatePerOneXdnStacked] = useState('');
    const [usdRewardPerOneXdnStackedPerDay, setUsdRewardPerOneXdnStackedPerDay] = useState('');

    useEffect(() => {
        setXdnRewardEstimatePerOneXdnStacked(parseInt(stakingRewardsPerDay) / parseInt(stakingPool) + '');
    }, [stakingRewardsPerDay, stakingPool]);

    useEffect(() => {
        setUsdRewardPerOneXdnStackedPerDay((parseFloat(xdnRewardEstimatePerOneXdnStacked) * parseFloat(xdnPriceInUsd)).toFixed(20));
    }, [xdnRewardEstimatePerOneXdnStacked, xdnPriceInUsd]);

    useEffect(() => {
        rewardPerOneXdnPerDaySetter(usdRewardPerOneXdnStackedPerDay);
    }, [usdRewardPerOneXdnStackedPerDay]);

    return (
        <>
            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`XDN Reward estimate per XDN Staked ${label}`}
                    value={`${xdnRewardEstimatePerOneXdnStacked}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD Reward estimate per 1 XDN per day ${label} `}
                    value={`$${usdRewardPerOneXdnStackedPerDay}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD Reward estimate per 1 XDN per week ${label} `}
                    value={`$${(parseFloat(usdRewardPerOneXdnStackedPerDay) * 7).toFixed(20)}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD Reward estimate per 1 XDN per month ${label} `}
                    value={`$${(parseFloat(usdRewardPerOneXdnStackedPerDay) * 365 / 12).toFixed(20)}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD Reward estimate per 1 XDN per year ${label} `}
                    value={`$${(parseFloat(usdRewardPerOneXdnStackedPerDay) * 365).toFixed(20)}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`ROI ${label} `}
                    value={`%${(parseFloat(usdRewardPerOneXdnStackedPerDay) * 365 / parseFloat(xdnPriceInUsd) * 100).toFixed(2)}`}
                    disabled={true}
                />
            </Grid>
        </>
    );
}
