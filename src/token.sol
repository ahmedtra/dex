// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./math.sol";

contract BuyAndRedeemToken is ERC20 {
    address public owner;
    uint256 public buyPrice = 1; // Price in Wei to buy 1 token
    uint256 public redeemPrice = 1; // Price in Wei to redeem 1 token
    uint256 public totalSupplyLimit = 10**22; // Total supply limit of tokens

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) {
        owner = msg.sender;
        _mint(msg.sender, _initialSupply * Math.decimals);

    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Buy tokens by sending Ether
    // Buy tokens by sending Ether
    function buyTokens() external payable {
        uint256 amount = msg.value / buyPrice;
        require(totalSupply() + amount <= totalSupplyLimit, "Total supply limit exceeded");
        uint256 cost = amount * buyPrice;
        require(msg.value >= cost, "Insufficient Ether sent");

        _mint(msg.sender, cost);
    }

    // Redeem tokens and receive Ether
    function redeemTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");

        uint256 redeemValue = amount * redeemPrice * Math.decimals;
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(redeemValue);
    }

    // Owner can change buy and redeem prices
    function setPrices(uint256 newBuyPrice, uint256 newRedeemPrice) external onlyOwner {
        buyPrice = newBuyPrice;
        redeemPrice = newRedeemPrice;
    }

    // Owner can withdraw Ether from the contract
    function withdrawEther(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient contract balance");
        payable(owner).transfer(amount);
    }

    // Fallback function to receive Ether (if someone mistakenly sends Ether to the contract)
    receive() external payable {}

    // Prevent accidental sending of Ether to the contract without a specific function call
    fallback() external payable {
        revert("Invalid transaction");
    }

    function approveContract(address dexAdress) public {
        approve(dexAdress, totalSupply());
    }

    function bPrice() public view returns (uint256){
        return buyPrice;
    }

    function rPrice() public view returns (uint256){
        return redeemPrice;
    }
}
