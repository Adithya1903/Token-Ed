// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* IMPORTS */
import "../interfaces/ISchoolUtilityTokens.sol";

contract Organization {
    /* STATE VARIABLES */
    address public vaultWallet;
    address public utilityContract;
    address public badgesContract;
    mapping(string => uint256) utilityTokenBalances;
    mapping(string => uint256) badgeBalances;

    /* CONSTRUCTOR */
    constructor(
        address _utilityContract,
        address _badgesContract,
        address _vaultWallet,
        uint256[] _tokenDistribution
    ) {
        vaultWallet = _vaultWallet;
        utilityContract = _utilityContract;
        badgesContract = _badgesContract;

        // transfer token distrbution to vault wallet
        ISchoolUtilityTokens(utilityContract)._safeTransferFrom(
            utilityContract,
            vaultWallet,
            [0, 1, 2, 3, 4],
            _tokenDistribution
        );
    }

    /* EXTERNAL FUNCTIONS */
    /**
     * @notice Method for sending more utility tokens into an organizations vault.
     * @param _tokenDistribution: the amount of each tokens to be sent.
     */
    function sendUtilityTokens(uint256[] _tokenDistribution) external {
        ISchoolUtilityTokens(utilityContract)._safeTransferFrom(
            utilityContract,
            vaultWallet,
            [0, 1, 2, 3, 4],
            _tokenDistribution
        );
    }
}
