//SPDX-License-Identifier: CC0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../MultisigOwnable.sol";

contract Example is ERC721, MultisigOwnable {
    constructor()
        ERC721("Mock NFT", "MNFT")
    {}

    function retrieveFunds(address payable to) external onlyRealOwner {
        to.transfer(address(this).balance);
    }
}