import {useEffect, useState} from "react";
import {Store} from "../store/store";
import {getBalanceOf} from "../utils/walletUtils";



export function ConnectWallet(){
    const [text, setText] = useState(
        Store.currentAccount.get() === "" ? "连接钱包" : Store.currentAccount.get());
    const [balance,setBalance] = useState(0)

    useEffect(() => {
        //使用mobx监听钱包状态的变化
        Store.currentAccount.observe_((newAccount) => {
            if (newAccount.newValue === "") {
                setText("连接钱包");
            } else {
                setText(newAccount.newValue);
            }
        });

        getBalanceOf(Store.currentAccount.get()).then(balance=>{
            setBalance(Number(balance));
        })
    }, []);
    console.log('text',text)

    const _connectWallet = () =>{
        //组件内部定义入口按钮展示文案状态

        if (Store.currentAccount.get() === "") {
            Store.wallet_is_show.set(true);
        }


    }

    if(text === "连接钱包"){
        return(
            <button className="btn btn-warning" onClick={()=>_connectWallet()}>
                {text}
            </button>
        )
    }else{
        return(
            <div>
                <div>地址:{Store.currentAccount.get()}</div>
                <div>余额:{balance}</div>
            </div>
        )
    }

}
