import React, {useEffect, useState} from "react";
import {getMetaDataList, ipfsToHttp} from "../utils/contractUtils";

export const NFTs = () => {
    const [metadatalist, setMetadataList] = useState([]);
    useEffect(() => {
        //获取NFT的MetaMata列表
        getMetaDataList()
            .then((arr) => {
                console.log('metadata list',arr)
                setMetadataList(arr);
            })
            .catch((err) => {
                console.error("err is" + err);
            });
    }, []);
    const items = metadatalist.map((metadata, index) =>
        <div className='nft-list-item' key={index}>
            <img className='nft-list-item-img' style={{height:"200px",width:"200px"}}  src={ipfsToHttp(metadata.image)} />
            <h4 className='nft-list-item-name'> {metadata.name} </h4>
        </div>
    );
    console.log("items is" + items);

    return(
        <div style={{display:"flex",width:"90%",flex:1}}>
            {items}
        </div>
    )
}
