import React from "react";
import {FadeInContainer} from "../../Login/FadeInContainer";
import {Redirect, Route, Switch} from "react-router-dom";
import {AirdropMain} from "./AirdropMain";
import {AirdropApply} from "./AirdropApply";
import {SingleContainerLayout} from "../../../components/layout/SingleContainerLayout";
import {AirdropSuccess} from "./AirdropSuccess";

export const Airdrop = () => {
    return (
        <>
            <FadeInContainer>
                <div style={{paddingTop: '100px'}}/>

                <SingleContainerLayout>
                    <Switch>
                        <Route path="/airdrop/home" render={() => <AirdropMain/>}/>
                        <Route exact path="/airdrop/apply" render={() => <AirdropApply/>}/>
                        <Route exact path="/airdrop/success" render={() => <AirdropSuccess/>}/>

                        <Redirect to='/airdrop/home'/>
                    </Switch>
                </SingleContainerLayout>

                <div style={{paddingBottom: '100px'}}/>
            </FadeInContainer>
        </>
    )
}
