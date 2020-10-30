import React from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Logo from "../../assets/img/DigitalNoteLogoText.png";
import {useNavigate} from "react-router-dom";

export const LogoComponent = () => {
    const navigate = useNavigate();

    return (
        <Grid item xs={12} style={{textAlign: 'center', paddingBottom: '25px'}}>
            <div style={{display: `inline-block`}}>
                <CardMedia component="img" src={Logo} style={{maxWidth: '320px', cursor: 'pointer'}} onClick={() => {
                    navigate("/auth");
                }}/>
            </div>
        </Grid>
    );
}
