require("dotenv").config({path: __dirname + '/.env'});
const hre = require("hardhat");
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const NETWORK = process.env.NETWORK
const API_KEY = process.env.API_KEY


const provider = new hre.ethers.providers.InfuraProvider(NETWORK, API_KEY);
const abi = require("../artifacts/contracts/NFT_WEB3_EXPLORER.sol/NFT_WEB3_EXPLORER.json").abi
const contractAddress = process.env.CONTRACT_ADDRESS
const contract = new hre.ethers.Contract(contractAddress, abi, provider)
const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider)

async function main() {
    const contractWithSigner = contract.connect(wallet);
    //获取mint需要多少ETH
    const price = await contract.PRICE_PER_TOKEN();
    console.log("price is" + price);
    //调用mint方法，支付mint费用
    const tx = await contractWithSigner.mint(1, { value: price});
    console.log(tx.hash);
    await tx.wait();
    console.log("mint success");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
