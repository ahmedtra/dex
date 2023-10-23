// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/token.sol";
import "../src/dex.sol";

contract CounterScript is Script {
    address priceFeed = 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c;

    BuyAndRedeemToken token;
    PerpDEX dex;
    function setUp() public {

        token = new BuyAndRedeemToken("MyToken", "BTC", 0);
        dex = new PerpDEX("BTC", 25000, priceFeed, address(token));
    }

    function run() public {
        vm.broadcast();
    }
}
