// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");
const fs = require("fs");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // const Token = await ethers.getContractFactory("Token");
  // const token = await Token.deploy();

  const Nft_web3_explrer = await ethers.getContractFactory("NFT_WEB3_EXPLORER");
  const nft_web3_explrer = await Nft_web3_explrer.deploy();

  // await token.deployed();
  await nft_web3_explrer.deployed();
  // console.log("Token address:", token.address);
  console.log("nft address",nft_web3_explrer.address)
  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(token,"Token");
  saveFrontendFiles(nft_web3_explrer,"NFT_WEB3_EXPLORER");
}

function saveFrontendFiles(token,name) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  const contract_address = path.join(__dirname, "..", "frontend", "src", "contracts","contract-address.json");
  if(!fs.existsSync(contract_address)){
    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),
        JSON.stringify({ [name]: token.address }, undefined, 2)
    );
  }else{
    let contentStr = fs.readFileSync(contract_address,{encoding:"utf8"});
    let contentJson = JSON.parse(contentStr);
    contentJson[name] = token.address;
    fs.writeFileSync(contract_address,JSON.stringify(
        contentJson,
        undefined,
        2),
        {encoding:"utf8"});

  }



  const TokenArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    path.join(contractsDir, `${name}.json`),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
