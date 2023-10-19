// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./type.sol";
import "./math.sol";


contract Book{
    mapping(address => uint256) public balances;

    mapping(address => Types.Trade[]) book;
    address[] traders;

    constructor() {
    }


    function checkTrader(address _trader) public view returns(bool){
        for (uint256 i = 0; i< traders.length ; i++){
            if (_trader == traders[i]) return true;
        }
        return false;
    }


    function allPositions(address _trader) public view returns (Types.Trade[] memory){
        return book[_trader];
    }


    // Allows traders to check their current position size
    function checkPosition(address _trader) public view returns (int256) {
        int256 position = 0;
        for (uint256 i = 0; i<book[_trader].length; i++){
            Types.Trade memory _trade = book[_trader][i];
            if(_trade.open){
                position += _trade.size;
            }
        }
        return position;
    }

    function checkContractPosition() public view returns (int256) {
        int256 position = 0;
        for (uint256 i = 0; i< traders.length ; i++){
            position += checkPosition(traders[i]);
        }
        return -position;
    }

    function computeProfitAndLoss(address _trader, uint256 _price) public {
        int256 pnl = 0;
        for (uint256 i = 0; i<book[_trader].length; i++){
            Types.Trade memory _trade = book[msg.sender][i];
            if(_trade.open){
                pnl += Math.multiply(_trade.size, int256(_price) - int256(_trade.price));
            }else{
                pnl += Math.multiply(_trade.size, int256(_trade.closePrice) - int256(_trade.price));
            }
        }

        emit Types.ProfitAndLossComputed(_trader, pnl);
    }

    function showTraders() public view returns (address[] memory){
      return traders;
    }
}
