//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";

contract TestTokenUpgradeable is OwnableUpgradeable, ERC20CappedUpgradeable {
    function initializeToken(uint256 initialSupply, uint256 cap) external initializer {
        __ERC20_init("TestToken", "TTT");
        __ERC20Capped_init_unchained(cap);

        __Ownable_init();
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // function transfer(
    //     address from,
    //     address to,
    //     uint256 amount
    // ) public {
    //     _transfer(from, to, amount);
    //     // _balances[address]
    // }
}
