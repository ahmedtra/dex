// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/token.sol";
import "../src/dex.sol";

contract DexTest is Test {

    address user;

    uint256 ethereumFork;

    address priceFeed = 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c;

    BuyAndRedeemToken token;
    PerpDEX dex;

    function setUp() public {
        user = vm.addr(12);
        vm.label(user, "USER");
        ethereumFork = vm.createFork(vm.envString("ETHEREUM_RPC_URL"));
        vm.selectFork(ethereumFork);
        token = new BuyAndRedeemToken("MyToken", "BTC", 0);
        dex = new PerpDEX("BTC", 25000, priceFeed, address(token));
        vm.label(address(token), "TOKEN");
        vm.label(address(dex), "DEX");

    }

    function test_trade() public {
        
        deal(user, 100000 ether);
        deal(address(dex), 100000 ether);
        vm.startPrank(user);
        console2.log("token price" ,token.rPrice());
        
        console2.log("asset price ", dex.getPrice());
        token.buyTokens{value : 10**16}();
        token.fundDex(address(dex), 10**16);
        token.approve(address(dex), 10**16);
        console2.log("balance dex : ", token.balanceOf(address(dex)));
        console2.log("balance usr : ", token.balanceOf(user));
        dex.trade(1);
        assertEq(address(dex.showTraders()[0]), user);
        // console2.log("trade", dex.allPositions(user));
        dex.updatePriceFromChainlink();
        console2.log("asset price ", dex.getPrice());
        //console2.log(dex.assetPrice);
        console2.log("balance dex : ", token.balanceOf(address(dex)));
        console2.log("balance usr : ", token.balanceOf(user));
        // dex.settlePosition(user, 0);
        dex.settlePosition();
        //console2.log(dex.allPositions(user));
        console2.log("balance dex : ", token.balanceOf(address(dex)));
        console2.log("balance usr : ", token.balanceOf(user));
        vm.stopPrank();
    }

    function test_trade_pos() public {
        
        deal(user, 100000 ether);
        deal(address(dex), 100000 ether);
        vm.startPrank(user);
        console2.log("token price" ,token.rPrice());
        
        console2.log("asset price ", dex.getPrice());
        token.buyTokens{value : 10**16}();
        token.fundDex(address(dex), 10**16);
        token.approve(address(dex), 10**16);
        
        dex.trade(1);
        assertEq(address(dex.showTraders()[0]), user);
        // console2.log("trade", dex.allPositions(user));
        dex.updatePrice(25200);
        console2.log("asset price ", dex.getPrice());
        //console2.log(dex.assetPrice);
        
        // dex.settlePosition(user, 0);
        dex.settlePosition();
        dex.updateClock();
        //console2.log(dex.allPositions(user));
        assertEq(token.balanceOf(address(dex)), 10**16 + dex.allPositions(user)[0].margin - 200 * 10**8);
        assertEq(token.balanceOf(user), 10**16 - dex.allPositions(user)[0].margin + 200 * 10**8);
        
        dex.closePosition(0);

        assertEq(token.balanceOf(address(dex)), 10**16 - 200 * 10**8);
        assertEq(token.balanceOf(user), 10**16 + 200 * 10**8);

        vm.stopPrank();
    }

    function test_trade_neg() public {
        
        deal(user, 100000 ether);
        deal(address(dex), 100000 ether);
        vm.startPrank(user);
        console2.log("token price" ,token.rPrice());
        
        console2.log("asset price ", dex.getPrice());
        token.buyTokens{value : 10**16}();
        token.fundDex(address(dex), 10**16);
        token.approve(address(dex), 10**16);
        
        dex.trade(1);
        assertEq(address(dex.showTraders()[0]), user);
        // console2.log("trade", dex.allPositions(user));
        dex.updatePrice(24800);
        console2.log("asset price ", dex.getPrice());
        //console2.log(dex.assetPrice);
        
        // dex.settlePosition(user, 0);
        dex.settlePosition();
        dex.updateClock();
        //console2.log(dex.allPositions(user));
        assertEq(token.balanceOf(address(dex)), 10**16 + dex.allPositions(user)[0].margin);
        assertEq(token.balanceOf(user), 10**16 - dex.allPositions(user)[0].margin);

        dex.closePosition(0);

        assertEq(token.balanceOf(address(dex)), 10**16 + 200 * 10**8);
        assertEq(token.balanceOf(user), 10**16 - 200 * 10**8);

        vm.stopPrank();
    }
}
