//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* IMPORTS */
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/* ERRORS */
// error Collection__AlreadyInitialized();
// error Collection__OnlyCallableThroughCommunityContract(
//   address communityAddress,
//   address caller
// );

contract Badge is ERC1155 {
    /* state variables */
    uint256 public constant STUDENT = 0; //100000;
    uint256 public constant PROFESSOR = 1; //50000;
    uint256 public constant ADMIN = 2; //10000;
    uint256 public constant OPPORTUNITYCOMPLETION = 3; //10000000;
    uint256 public constant ORGANIZATIONMEMBERSHIP = 4; //10000000;
    uint256 public constant GRADUATION = 5; //10000000;

    /* constructor */
    constructor(string memory _URI) public ERC1155(_URI) {
        _URI = URI;
    }

    /* transfer Badges */
}
