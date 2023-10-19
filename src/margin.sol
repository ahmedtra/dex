// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Math} from "./math.sol";
import "./type.sol";

contract Margin {

    uint256 marginRequirement = 20;
    uint256 marginLimit = 2;
    mapping(address => uint256) public margins;

    constructor() {
    }


    function setMargin(address _trader, uint256 margin) public {
        margins[_trader] = margin;
    }

    function addMargin(address _trader, int256 margin) public {
        margins[_trader] = uint256(margin + int256(margins[_trader]));
    }

    function checkMargin(address _trader, int256 pnl) public view returns (bool) {
        if(pnl <= -int256(Math.divide(margins[_trader],marginLimit))) return true;
        return false;
    }

    function computeMargin(int256 _position, int256 _size,  uint256 _price) public view returns (uint256) {
        int256 _totalSize = Math.getAbsoluteValue(_position + _size);
        int256 _margin = Math.multiply(_totalSize, int256(_price)) * int256(marginRequirement) / 100;  
        return uint256(_margin);
    } 


    function checkMarginTrade(Types.Trade memory _trade, uint256 _price) public view returns (bool){
        if(_trade.open){
                int256 pnl = Math.multiply(_trade.size, int256(int256(_price) - int256(_trade.price)));
                if(pnl <= -int256(Math.divide(_trade.margin,marginLimit))){return true;}
            }
        return false;
    }

}
