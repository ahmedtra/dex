// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import "../src/token.sol";
import "../src/dex.sol";

contract dex is Script {
    address priceFeed = 0xA39434A63A52E749F02807ae27335515BA4b07F7;

    BuyAndRedeemToken token;
    PerpDEX dex;
    function setUp() public {

    }

    function run() public returns(address, address){
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        token = new BuyAndRedeemToken("MyToken", "BTC", 0);
        dex = new PerpDEX("BTC", 25000, priceFeed, address(token), true);
        token.fund(address(dex), 10**18);
        token.fund(vm.addr(deployerPrivateKey), 10**18);
        
        vm.stopBroadcast();

        console2.log("vault address: %s", address(dex));
        console2.log("sender address: %s", address(token));
        return (address(dex), address(token));
    }
}
