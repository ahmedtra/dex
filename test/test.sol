// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/token.sol";
import "../src/dex.sol";

contract DexTest is Test {

    address user;

    uint256 ethereumFork;

    address priceFeed = 0x72AFAECF99C9d9C8215fF44C77B94B99C28741e8;

    BuyAndRedeemToken token;
    PerpDEX dex;

    function setUp() public {
        user = vm.addr(0x1337);
        ethereumFork = vm.createFork(vm.envString("ETHEREUM_RPC_URL"));

        token = new BuyAndRedeemToken("MyToken", "BTC", 0);
        dex = new PerpDEX("BTC", 25000, priceFeed, address(token));

    }

    function test_trade() public {
       //vm.selectFork(ethereumFork);
        deal(user, 10 ether);
        vm.startPrank(user);
        console2.log(token.rPrice());
        token.buyTokens{value : 10**18}();
        token.approve(address(dex), 10**18);
        dex.trade(1);
        vm.stopPrank();
    }

}
