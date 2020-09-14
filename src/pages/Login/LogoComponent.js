import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import Logo from "../../assets/img/DigitalNoteLogoText.png";

export const LogoComponent = () => {
    return (
        <Grid item xs={12} style={{textAlign: 'center', paddingBottom: '25px'}}>
            <Link to="https://digitalnote.org/" style={{display: `inline-block`}}>
                <CardMedia component="img" src={Logo} style={{maxWidth: '320px'}}/>
            </Link>
        </Grid>
    );
}
