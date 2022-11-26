//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";




contract NFT_WEB3_EXPLORER is ERC721, ERC721Enumerable, Ownable {
    string private _baseURIextended;
    //我们设置最多可以mint1000个
    uint256 public constant MAX_SUPPLY = 1000;
    //每个mint的价格是0.01EHT
    uint256 public constant PRICE_PER_TOKEN = 0.01 ether;

    constructor() ERC721("nft_web3_explorer", "NFT_WEB3_EXPLORER") {
    }

    function _beforeTokenTransfer( address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize) internal virtual override(ERC721, ERC721Enumerable) {

        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function mint(uint numberOfTokens) public payable {
        uint256 ts = totalSupply();
        require(ts + numberOfTokens <= MAX_SUPPLY, "Purchase would exceed max tokens");
        //需要好好看看msg下含有什么东西
        require(PRICE_PER_TOKEN * numberOfTokens <= msg.value, "Ether value sent is not correct");

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, ts + i);
        }
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    //没有白名单

    //没有限制每个地址可以mint多少

    //没有链接钱包的方法
}
