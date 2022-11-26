import {ethers} from "ethers";
//判断钱包是否安装
export const isMetaMaskInstalled = () =>{
    const {ethereum} = window;
    return ethereum && ethereum.isMetaMask;
}
//请求连接钱包
export const metamaskConnect = async () => {
    try {
        const { ethereum } = window;
        return await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error(error);
    }
};
//获取当前已经连接的钱包地址
export const getConnectAccount = async () => {
    const { ethereum } = window;
    const account = await ethereum.request({ method: 'eth_accounts' });
    console.log("getConnectAccount" + account);
    return account;
}
//获取当前钱包余额
export const  getBalanceOf = async (address) => {
   const result = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [
            address ,
            'latest'
        ]
    }).catch((error) => {
            console.log("获取余额error--->" + error.code)
        });
    console.log("获取余额success--->" + result)
    let formartEther = ethers.utils.formatEther(result); //16进制的wei
    console.log(formartEther)
    return formartEther;
}
