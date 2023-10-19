// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // Import Chainlink's AggregatorV3Interface
import "./math.sol";

contract Oracles {

    string public assetName;
    uint256 public assetPrice;
    uint256 public settlePrice;
    address public priceFeedAddress; // Address of Chainlink Price Feed

    // Allows the owner to update the asset price and funding rate
    function updatePrice(uint256 _newPrice) public {
        assetPrice = Math.applyFixedPoint(_newPrice);
    }

    // Function to update the asset price from Chainlink's Price Feed
    function updatePriceFromChainlink() public {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        (, int256 price, , , ) = priceFeed.latestRoundData();
        settlePrice = assetPrice;
        updatePrice(uint256(price));

    }

}
