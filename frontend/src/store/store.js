import {observable} from "mobx";
import {getConnectAccount} from "../utils/walletUtils";

const help = () => {
    // 钱包选择页面板是否展示状态
    const wallet_is_show = observable.box(false);
    // 当前连接的钱包地址，未连接则存储""
    const currentAccount = observable.box("");
    const handleAccountChange = (accounts) => {
        if (accounts.length === 0) {
            console.log("accounts is null");
            currentAccount.set("");
        } else if (accounts[0] !== currentAccount) {
            console.log("accounts is " + accounts[0]);
            currentAccount.set(accounts[0]);
        }
    }

    //注册钱包状态的监听
    const registerAccountChange = () => {
        console.log("registerAccountChange");
        const { ethereum } = window;

        //注册时先获取一次当前状态
        getConnectAccount().
        then((accounts) => {
            handleAccountChange(accounts);
        }).catch((err) => {
            console.error(err);
        });

        //使用metamask提供的API注册钱包状态监听
        ethereum.on('accountsChanged', (accounts) => {
            handleAccountChange(accounts);
        });
    }

    return {wallet_is_show, registerAccountChange,currentAccount};

};
export const Store = help();
