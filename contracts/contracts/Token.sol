//SPDX-License-Identifier: MIT
pragma solidity =0.8.18;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @title Token
 * @author kotsmile
 */
contract Token is ERC20 {
    uint8 private _decimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, 1_000_000_000 * 10**decimals_);
        _decimals = decimals_;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
