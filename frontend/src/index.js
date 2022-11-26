import React from "react";
// import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client";
// import { Dapp } from "./components/Dapp";

import { NFTMain } from "./nft-components/NFT-main";

// We import bootstrap here, but you can remove if you want
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter} from "react-router-dom";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

// ReactDOM.render(
//
//   document.getElementById("root")
// );
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <React.StrictMode>
            <NFTMain />
        </React.StrictMode>
    </BrowserRouter>

)

