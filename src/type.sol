// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Types {

    struct Trade {
        int256 size;
        uint256 price;
        uint256 margin;
        bool open;
        uint256 closePrice;
        uint256 openTime;
    }

    event TradeEvent(
        address indexed trader,
        int256 indexed positionSize,
        uint256 indexed price,
        uint256 margin
    );

    event PositionChecked(address indexed trader, int256 positionSize);
    event ProfitAndLossComputed(address indexed trader, int256 profitOrLoss);

}
