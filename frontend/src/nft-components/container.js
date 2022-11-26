import React from "react";
import "./container.scss"
import {Introduce} from "./introduce";
import {Mint} from "./mint";
import {NFTs} from "./nfts";
import {Route, Routes} from "react-router-dom";


export function Container({tab}) {
    return (
        <div className="container">
            <Routes>
                <Route path="/introduce" element={<Introduce/>}/>
                <Route path="/mint" element={<Mint/>}/>
                <Route path="/nft" element={<NFTs/>}/>
            </Routes>
        </div>
    )
}
