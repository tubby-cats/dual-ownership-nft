# Multisig Ownable

Opensea only allows EOAs to make changes to collections, which makes it impossible to use multisigs to secure NFT contracts since when you want to make changes you need to transfer ownership to an EOA, who can just keep ownership forever and never give it back, enabling them to set high royalties to themselves and rug the project.

This contract establishes a second owner that can change the EOA owner, this way a multisig or an on-chain DAO can give ownership to an EOA and later claim it back, making it impossible to rug.

In short, it creates a dual ownership model with an admin owner that can be set to a multisig or DAO.

## Usage
Just import [`MultisigOwnable`](./contracts/MultisigOwnable.sol) into your contract and use the `onlyRealOwner` modifier for any functions that need to have restricted access

## Example
```solidity
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
```

## License
All code has been licensed under CC0, just like tubby cats themselves.