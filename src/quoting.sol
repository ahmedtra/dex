// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./math.sol";

contract Quoting {
    
    uint256 public premium;
    uint256 premiumMargin = 1 * Math.decimals; // to adjust automatically


    constructor() {
    }

    function updatePremium(uint256 _newPremium) private {
        premium = _newPremium;
    }

    function computePremium(uint256 _premiumMargin, uint256 _price) private pure returns (uint256){
        // int256 position = getAbsoluteValue(checkContractPosition());
        return uint256(Math.multiply(int256(_premiumMargin), int256(_price)) / 100) ; // adjust so that the premium is based on the position
    }

    function computeTradePrice(uint256 _price, int256 _size, int256 _postion) public returns (uint256){
        updatePremium(computePremium(premiumMargin, _price));
        int256 price;
        if (_size > 0){
            if (_postion > 0) {
                    price = int256(_price) + int256(premium);
                } else {
                    price = int256(_price);
                }
        } else {
                if (_postion > 0)
                    price = int256(_price);
                else {
                    price = int256(_price) - int256(premium);
                }
        }
        if (price < 0) price = 0;

        return uint256(price);
        
    }


}
