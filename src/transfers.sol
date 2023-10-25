// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./math.sol";

contract Transfers{
    IERC20 public token;
  
    // Allows traders to close their positions
    function redeem(uint256 amount) public {
        
        require(token.approve(address(this), amount), "Approval failed"); 
        token.transferFrom(address(this), msg.sender, amount);
        
    }

    
    function redeem(uint256 amount, address _trader) public {
        
        require(token.approve(address(this), amount), "Approval failed"); 
        token.transferFrom(address(this), _trader, amount);
        
    }
    
    function transfer(uint256 amount) public {
        token.transferFrom(msg.sender, address(this), amount);
    }

    function balance(address adr) public view returns (int256){
        return Math.applyFixedPoint(int256(token.balanceOf(adr)));
    }
}
