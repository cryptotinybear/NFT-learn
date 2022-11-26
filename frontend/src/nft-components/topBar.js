import React from "react";

import {ConnectWallet} from "./connectWallet";
import {Link} from "react-router-dom";

export function TopBar({onTab}) {
    return (
        <div className="topBar">
            <h1>CryptoTinyBear</h1>
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",position:"absolute",
                left:"50%",
                transform:[`translateX(-50%)`]
            }}>
                <Link className="title card-title" to="/introduce">简介</Link>
                <Link className="title card-title" to="/mint">mint</Link>
                <Link className="title card-title" to="nft">NFT列表</Link>
            </div>
            <ConnectWallet/>
        </div>
    )
}
