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

contract SchoolUtilityTokens is ERC1155 {
  /* state variables */
  uint256 public constant SCIENCE = 10000000;
  uint256 public constant ENGINEERING = 10000000;
  uint256 public constant ARTS = 10000000;
  uint256 public constant BUSINESS = 10000000;
  uint256 public constant WELLNESS = 10000000;

  /* constructor */
  // constructor() public ERC1155()

  

  /* external functions */

}