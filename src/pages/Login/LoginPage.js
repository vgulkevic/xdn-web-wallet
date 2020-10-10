import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoginSetup} from "./LoginSetup";
import {NewAddress} from "./NewAddress";
import {ImportAddress} from "./ImportAddress";
import {SingleContainerLayout} from "../../components/layout/SingleContainerLayout";
import {FadeInContainer} from "./FadeInContainer";

export const LoginPage = ({...props}) => {

    return (
        <>
            <FadeInContainer>
                <div style={{paddingTop: '100px'}}/>

                <SingleContainerLayout>
                    <Switch>
                        <Route path="/set-up" render={() => <LoginSetup/>}/>
                        <Route exact path="/new-address" render={() => <NewAddress/>}/>
                        <Route exact path="/import-address" render={() => <ImportAddress/>}/>


                        <Redirect to='/set-up'/>
                    </Switch>
                </SingleContainerLayout>

                <div style={{paddingBottom: '100px'}}/>
            </FadeInContainer>
        </>
    );
}
