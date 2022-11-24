npx hardhat compile --编译
npx hardhat test --单元测试
npx hardhat run script/deploy.js --network <network-name> --在hardhat.config.js中进行相关配置
npx hardhat node --是建立本地Hardhat Network，便于钱包链接此地址
npx hardhat --network localhost faucet <your address> 为钱包注入一些eth
