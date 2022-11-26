require("dotenv").config({path: __dirname + '/.env'});
const hre = require("hardhat");
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const NETWORK = process.env.NETWORK
const API_KEY = process.env.API_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const provider = new hre.ethers.providers.InfuraProvider(NETWORK, API_KEY);
//编译完成合约会自动生成
const abi = require("../artifacts/contracts/NFT_WEB3_EXPLORER.sol/NFT_WEB3_EXPLORER.json").abi
// const contractAddress = CONTRACT_ADDRESS
const contract = new hre.ethers.Contract(CONTRACT_ADDRESS, abi, provider)
const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider)
const baseURI = process.env.META_ADDRESS

async function main() {
    const contractWithSigner = contract.connect(wallet);
    //调用setBaseURI方法
    await setBaseURI(contractWithSigner);
    // await getTokenURI(contractWithSigner);
}

async function setBaseURI(contractWithSigner){
    const tx = await contractWithSigner.setBaseURI(baseURI)
    console.log(tx.hash);
    await tx.wait();
    console.log("setBaseURL success",baseURI);
}

async function getTokenURI(contractWithSigner){
    //疑问：所有的合约对象的的函数都是异步的吗？
    const tokenURI = await contractWithSigner.tokenURI(0);
    console.log(tokenURI);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
