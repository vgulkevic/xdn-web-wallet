import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import SimpleInput from "../../components/input/SimpleInput";
import Divider from "@material-ui/core/Divider";

export const RewardCalculator = ({label, blocksPerDay, costOfMasternodeInUsd, masternodesCount, rewardsPaidToMNPerDayMax, xdnPriceInUsd}) => {

    const [xdnRewardPerDay, setXdnRewardPerDay] = useState('');
    const [usdRewardPerDay, setUsdRewardPerDay] = useState('');

    useEffect(() => {
        try {
            const res = parseInt(rewardsPaidToMNPerDayMax) / parseInt(masternodesCount)
            setXdnRewardPerDay(isNaN(res) ? "" : res + "");
        } catch (err) {
            setXdnRewardPerDay('');
        }
    }, [masternodesCount, rewardsPaidToMNPerDayMax, xdnPriceInUsd]);

    useEffect(() => {
        try {
            const res = parseFloat(xdnPriceInUsd) * parseInt(xdnRewardPerDay);
            setUsdRewardPerDay(isNaN(res) ? "" : parseFloat(res).toFixed(3) + "");
        } catch (err) {
            setUsdRewardPerDay('');
        }
    }, [xdnPriceInUsd, xdnRewardPerDay]);

    return (
        <>
            <Grid item style={{paddingTop: '30px'}}/>


            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`XDN Reward estimate per MN per day ${label}`}
                    value={xdnRewardPerDay}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Reward estimate per MN per day ${label} `}
                    value={`$${usdRewardPerDay}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Reward estimate per MN per week ${label}`}
                    value={`$${usdRewardPerDay*7}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Reward estimate per MN per month ${label}`}
                    value={`$${ parseFloat(usdRewardPerDay*365/12).toFixed(2) }`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Reward estimate per MN per annum ${label}`}
                    value={`$${usdRewardPerDay*365}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Blocks per MN per day ${label}`}
                    value={blocksPerDay/masternodesCount || 0}
                    disabled={true}
                />
            </Grid>

            <Divider variant="inset"
                     component="li"
                     style={{width: '100%', listStyle: 'none', margin: '20px 0', height: `3px`, backgroundColor: 'dimgrey'}}/>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`ROI ${label}`}
                    value={`%${((usdRewardPerDay*365) / costOfMasternodeInUsd * 100).toFixed(2)}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`VPS cost per annum on Trttnodes`}
                    value={`$24`}
                    disabled={true}
                />
            </Grid>

            <Divider variant="inset"
                     component="li"
                     style={{width: '100%', listStyle: 'none', margin: '20px 0', height: `3px`, backgroundColor: 'dimgrey'}}/>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Net Estimated Return ${label}`}
                    value={`$${(usdRewardPerDay*365) - 24}`}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={12}>
                <SimpleInput
                    type={'text'}
                    label={`Net ROI ${label}`}
                    value={`%${ (((usdRewardPerDay*365) - 24) / costOfMasternodeInUsd * 100).toFixed(2) }`}
                    disabled={true}
                />
            </Grid>
        </>
    );
}
