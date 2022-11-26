import {Store} from '../store/store'
import './walletSelect.scss';
import { useEffect, useState } from 'react';
import { isMetaMaskInstalled, metamaskConnect } from '../utils/walletUtils';

export function WalletSelect(){
    //组件内部定义钱包选择页面是否展示的状态。
    const wallets = [
        {name:"MetaMask"},{name:"Wallet1"},{name:"Wallet2"}
    ]
    const [wallet_is_show, setWalletShow] = useState(false);
    useEffect(() => {
        //如果其他地方打开或关闭钱包选择页面，组件内部状态需要同步
        Store.wallet_is_show.observe_((change) => {
            setWalletShow(change.newValue);
        });
        // 如果账户状态发生改变，需要关闭该页面，比如连接钱包成功应该自动关闭该页面
        Store.currentAccount.observe_((change) => {
            Store.wallet_is_show.set(false);
        });
    }, []);

    if (!wallet_is_show) {
        return (<div style={{display:"none"}}>1</div>)
    }

    const text = isMetaMaskInstalled() ? "MetaMask" : "请先安装 MetaMask";
    return (
        <div className='wallet-page-bg' onClick={cancel_click}>
            <div className='wallet-page-panel'>
                {
                    wallets.map((item,index)=>{
                        return(
                            <div key={index}
                                 onClick={(e) => {metaMask_click(e,item)}}
                                 className="wallet-item">
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

const cancel_click = () => {
    console.log("cancel_click");
    Store.wallet_is_show.set(false);
}

const metaMask_click = async (e,item) => {
    e.stopPropagation();
    if (isMetaMaskInstalled() && item.name === 'MetaMask') {
        await metamaskConnect();
        console.log("metaMask_click 链接成功");
        Store.registerAccountChange()
    }

}
