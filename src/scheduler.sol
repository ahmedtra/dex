// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Scheduler {

    uint256 clock = 0;
    uint256 timestamp = 0;
    uint256 nextTimestamp = 0;

    function alarmCallback() public virtual{
    // Handle the scheduled event when the alarm fires
    // This is where you can execute your custom logic
    }

    function getNextHourTimestamp() public view returns (uint256) {
            // Get the current timestamp
            uint256 currentTimestamp = block.timestamp;

            // Calculate the number of seconds remaining until the next hour
            uint256 secondsUntilNextHour = 3600 - (currentTimestamp % 3600);

            // Calculate the timestamp of the next hour
            uint256 nextHourTimestamp = currentTimestamp + secondsUntilNextHour;

            return nextHourTimestamp;
        }
    
    function setNextAlarmClock() public returns (bool){
        
        if (block.timestamp > nextTimestamp){
            nextTimestamp = getNextHourTimestamp();
            updateClock();
            return true;
        } 
        return false;
    }

    function updateClock() public {
        clock +=1;
    }
    }


    
