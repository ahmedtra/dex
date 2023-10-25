// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./token.sol";
import "./oracles.sol";
import "./quoting.sol";
import "./margin.sol";
import "./math.sol";
import "./book.sol";
import "./transfers.sol";
import "./scheduler.sol";


contract PerpDEX is Quoting, Margin, Oracles, Book, Transfers, Scheduler{
    address public owner;

    constructor(string memory _assetName, uint256 _initialPrice, address _pricefeed, address _token, bool _settleOnPrice) {
        owner = msg.sender;
        assetName = _assetName;
        assetPrice = Math.applyFixedPoint(_initialPrice);
        settlePrice = Math.applyFixedPoint(_initialPrice);
        priceFeedAddress = _pricefeed;
        token = IERC20(_token);
        settleOnPrice = _settleOnPrice;
    }

    function alarmCallback() public override{
        if (setNextAlarmClock()) {
            updatePriceFromChainlink();
            settlePosition();
            checkMarginCalls();
        }
    }

    // Allows traders to enter long or short positions
    function trade(int256 _positionSize) public {
        require(_positionSize != 0, "Position size must be non-zero");

        // alarmCallback();

        _positionSize = Math.applyFixedPoint(_positionSize);
        int256 _totalPosition = checkPosition(msg.sender);
        int256 margin = int256(computeMargin(0,_positionSize,assetPrice));

        require(balance(msg.sender) > margin, "not enough funds");
        // _positionSize *= 100;

        if (!checkTrader(msg.sender)) traders.push(msg.sender);

        // Ensure the trader has enough margin
        require(int256(balances[msg.sender]) + margin >= 0, "Insufficient margin");

        // Update the trader's margin and position
        balances[msg.sender] = uint256(int256(balances[msg.sender]) + margin);
        addMargin(msg.sender,margin);
        transfer(uint256(margin));

        uint256 price = computeTradePrice(assetPrice, _positionSize, _totalPosition);

        Types.Trade memory _trade = Types.Trade(_positionSize, price, uint256(margin), true, assetPrice, clock);
        book[msg.sender].push(_trade);

        // Emit a trade event
        emit Types.TradeEvent(msg.sender, _positionSize, price, uint256(margin));
    }


    // Allows traders to close their positions
    function closePosition(uint256 key) public {

        require(int256(margins[msg.sender]) != 0, "No open position to close");
        require(book[msg.sender].length >= key, "Position does not exist");

        Types.Trade storage _trade = book[msg.sender][key];

        require(_trade.open, "Position already closed");
        // Calculate profit or loss based on the asset price change
        int256 pnl = Math.multiply(_trade.size, int256(assetPrice) - int256(_trade.price));
        settlePosition(msg.sender, key);
        // Transfer profit or loss to the trader

        uint256 redemption = 0;
        if (pnl > 0){
            redemption = uint256(_trade.margin);
        } else {
            redemption = uint256(pnl + int256(_trade.margin));
        }

        redeem(redemption);
        balances[msg.sender] = uint256(int256(balances[msg.sender]) - int256(redemption));
        addMargin(msg.sender, -int256(_trade.margin));
        // Update the position size
        _trade.open = false;
        _trade.closePrice = assetPrice;

        int256 tradeSize = Math.multiply(-_trade.size, int256(assetPrice));
        // Emit a trade event with position size set to 0 to indicate position closure
        emit Types.TradeEvent(msg.sender, tradeSize, assetPrice, 0);
    }

    function settlePosition(address _trader, uint256 key) public {
        Types.Trade memory _trade = book[_trader][key];
        int256 settlePnl;
        if (_trade.openTime == clock){
            settlePnl = Math.multiply(_trade.size, (int256(assetPrice) - int256(_trade.price)));
        } else {
            settlePnl = Math.multiply(_trade.size, (int256(assetPrice) - int256(settlePrice)));
        }

        if (settlePnl > 0){
            redeem(uint256(settlePnl), _trader);
        } else {
            balances[msg.sender] = uint256(int256(balances[msg.sender]) + settlePnl);
        }


    }

    function checkMargin(address _trader) public {
        for (uint256 i = 0; i<book[_trader].length; i++){
            Types.Trade memory _trade = book[msg.sender][i];
            if(checkMarginTrade(_trade, assetPrice)){closePosition(i);}

        }
    }

    function checkMarginCalls() public {
        for (uint256 i = 0; i< traders.length ; i++){
            checkMargin(traders[i]);
        }
    }

    function settlePosition(address _trader) public {
        for (uint256 i = 0; i<book[_trader].length; i++){
            settlePosition(_trader, i);
        }
    }

    function settlePosition() public {
        for (uint256 i = 0; i< traders.length ; i++){
            settlePosition(traders[i]);
        }
        updatePrice(assetPrice / Math.decimals);
    }

}
