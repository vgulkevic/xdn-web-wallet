import React, {useEffect, useState} from "react";
import SimpleInput from "../../../components/input/SimpleInput";
import Grid from "@material-ui/core/Grid";

export const MyStakingCalculator = ({label, xdnPriceInUsd, stakingAmount, usdRewardPerOneXdnStackedPerDay}) => {

    const [costOfInvestment, setCostOfInvestment] = useState('');
    const [usdRewardForStakePerDay, setUsdRewardForStakePerDay] = useState('');

    useEffect(() => {
        try {
            const res = parseFloat(xdnPriceInUsd) * parseInt(stakingAmount);
            setCostOfInvestment(isNaN(res) ? "" : parseFloat(res).toFixed(3) + "");
        } catch (err) {
            setCostOfInvestment('');
        }
    }, [xdnPriceInUsd, stakingAmount]);

    useEffect(() => {
        try {
            const res = parseFloat(usdRewardPerOneXdnStackedPerDay) * parseInt(stakingAmount);
            setUsdRewardForStakePerDay(isNaN(res) ? "" : parseFloat(res) + "");
        } catch (err) {
            setUsdRewardForStakePerDay('');
        }
    }, [stakingAmount, usdRewardPerOneXdnStackedPerDay]);

    return (
        <>
            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Cost of investment ${label}`}
                    value={`$${costOfInvestment}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD reward estimate for stake per day ${label}`}
                    value={`$${usdRewardForStakePerDay}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD reward estimate for stake per week ${label}`}
                    value={`$${parseFloat(usdRewardForStakePerDay) * 7}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD reward estimate for stake per month ${label}`}
                    value={`$${parseFloat(usdRewardForStakePerDay) * 365 / 12}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`USD reward estimate for stake per year ${label}`}
                    value={`$${parseFloat(usdRewardForStakePerDay) * 365}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`ROI ${label}`}
                    value={`%${(parseFloat(usdRewardForStakePerDay) * 365 / parseFloat(costOfInvestment) * 100).toFixed(2)}`}
                    disabled={true}
                />
            </Grid>
        </>
    );
}
