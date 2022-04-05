//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TestToken is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    function initialize() external initializer {
        __ERC20_init("TestToken4", "TT4");

        __Ownable_init();
        _mint(msg.sender, 100000000 * 10**decimals());
    }
}
