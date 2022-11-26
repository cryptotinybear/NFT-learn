import {ethers} from "ethers";
import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/browser';
import contractAddress from '../contracts/contract-address.json'
import contractJSON from '../contracts/NFT_WEB3_EXPLORER.json'

const gatewayTools = new IPFSGatewayTools();

//获取tokenID对应的URI
export const getTokenURI = async (tokenID) => {
    const contract = getContract();
    return await contract.tokenURI(tokenID);
}


//获取合约
const getContract = () => {
    //在这里我们使用MetaMask向浏览器注入的provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = contractAddress.NFT_WEB3_EXPLORER;
    const abi = contractJSON.abi;
    return new ethers.Contract(address, abi, provider);
}

//获取已经mint的token总数
export const totalSupplyToken = async () => {
    const contract = getContract();
    return await contract.totalSupply();
}

//获取已mint tokenURI对应的metadata
export const getMetaDataList = async () => {
    const totalSupply = await totalSupplyToken();
    console.log("totalSupplyToken is" + totalSupply);
    const list = []
    for (let tokenID = 0; tokenID < totalSupply; tokenID++) {
        const tokenURI = await getTokenURI(tokenID);
        const res = await parseMetaData(tokenURI);
        list.push(res);
    }
    return list;
}

//通过tokenURI获取metadata
export const parseMetaData = async (TokenURI) => {
    const res = await fetch(TokenURI);
    return await res.json();
}

//将ipfs地址转为http地址
export const ipfsToHttp = (ipfsURL) => {
    return gatewayTools.convertToDesiredGateway(ipfsURL, "https://gateway.pinata.cloud");
}

//获取最大可mint数量
export const maxSupplyToken = async () => {
    const contract = getContract();
    return await contract.MAX_SUPPLY();
}

//同时返回当前mint总数和最大mint总数
export const getMintInfo = async () => {
    const totalSupply = await totalSupplyToken();
    const maxSupply = await maxSupplyToken();
    return [totalSupply, maxSupply];
}
// mint功能，这里同样是使用metamask进行签名，调用该方法MetaMask会弹出交易确认按钮
export const mint = async () => {
    const contract = getContract();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const price = await contract.PRICE_PER_TOKEN();
    console.log("price is" + price);
    const tx = await contractWithSigner.mint(1, { value: price });
    console.log(tx.hash);
    await tx.wait();
}
