// SPDX-License-Identifier: MIT
pragma solidity =0.8.18;

import {Test, console} from 'forge-std/Test.sol';

import {Token} from '../../contracts/Token.sol';
import {Staking} from '../../contracts/Staking.sol';

contract TestStaking is Test {
    Token token;
    Staking staking;

    uint256 initialStakingBalance = 1_000_000 ether;

    function setUp() public {
        token = new Token('Test', 'TST');
        staking = new Staking(token);

        token.transfer(address(staking), initialStakingBalance);
    }

    function testFuzz_stake(uint256 amount, uint256 id) public {
        vm.assume(id < staking.legitMaxId()); // legit stakind id
        vm.assume(amount < type(uint256).max / staking.apy(id));

        uint256 reward = (amount * staking.apy(id)) /
            staking.DENOMINATOR() -
            amount;

        vm.assume(reward <= initialStakingBalance); // legit amount

        token.approve(address(staking), amount);
        staking.stake(amount, id);
    }
}
