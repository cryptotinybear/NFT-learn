import React, {useEffect, useState} from "react";
import {getMintInfo, mint} from "../utils/contractUtils";
import {Store} from "../store/store";

export const Mint = () => {
    const [totalSupply, setTotalSupply] = useState(0);
    const [maxSupply, setMaxTotalSupply] = useState(0);
    useEffect(() => {
        updataMintInfo();
    }, []);
    const updataMintInfo = () => {
        getMintInfo()
            .then((info) => {
                setTotalSupply(info[0]);
                setMaxTotalSupply(info[1]);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    const mintClick = () => {
        if (Store.currentAccount.get() === "") {
            window.alert("请先连接钱包");
            return;
        }
        mint()
            .then(() => {
                //mint成功后更新mint信息
                updataMintInfo();
                window.alert("mint成功");
            }).catch();
    }
    return(
        <div>
            <h1>尝试铸造您的第一枚NFT！</h1>
            <div className='mintpage'>
                <div className='text-info'>当前mint进度 {"" + totalSupply} / {"" + maxSupply}</div>
                <div className='btn btn-success' onClick={mintClick}>一键mint</div>
            </div>
        </div>
    )
}
