import React from "react";
import "./main.scss"
import {BottomBar} from './bottomBar'
import {TopBar} from "./topBar";
import {Container} from "./container";
import {Store} from "../store/store";
import {WalletSelect} from "./walletSelect";

export class NFTMain extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
            tab : "introduce"
        }
        this.state = this.initialState
    }
    componentDidMount() {
        Store.registerAccountChange()
    }

    render() {
        return(
            <div className="main">
                <TopBar onTab={(tab)=>this._onTab(tab)}/>
                <Container tab={this.state.tab}/>
                <BottomBar />
                {/*钱包选择界面*/}
                <WalletSelect/>
            </div>
        )
    }
    _onTab(tab){
        console.log('tab change',tab)
        this.setState({
            tab:tab
        });
    }
}
