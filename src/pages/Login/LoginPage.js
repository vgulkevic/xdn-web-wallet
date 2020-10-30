import React, {useEffect} from "react";
import {SingleContainerLayout} from "../../components/layout/SingleContainerLayout";
import {FadeInContainer} from "./FadeInContainer";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Outlet} from "react-router-dom";
import {AUTH_STORE_NAME, getAuthStateNames} from "./redux/loginSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {DASHBOARD_PATH} from "../Private/Dashboard/Dashboard";

export const LoginPage = () => {
    const navigate = useNavigate();

    const {
        [getAuthStateNames.entity]: loggedInUser,
    } = useSelector(state => state[AUTH_STORE_NAME])

    useEffect(() => {
        if (loggedInUser) {
            navigate(DASHBOARD_PATH);
        }
    }, [loggedInUser, navigate]);

    return (
        <>
            <FadeInContainer>
                <div style={{paddingTop: '100px'}}/>

                <SingleContainerLayout>

                    <Grid item container justify="center" style={{height: "100%"}}>
                        <Grid item xs={7}>
                            <Box display="flex" flexDirection="column" alignItems="center" style={{padding: 8}}>
                                <Outlet/>
                            </Box>
                        </Grid>
                    </Grid>

                </SingleContainerLayout>

                <div style={{paddingBottom: '100px'}}/>
            </FadeInContainer>
        </>
    );
}
