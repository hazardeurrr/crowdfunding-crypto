pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlockBoosted is ERC20 {

    /**
     * Constrctor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    constructor(uint256 totalSupply_) ERC20('BlockBoosted', 'BBST'){
        
        _mint(address(msg.sender), totalSupply_);
    }

    function mint(uint256 amount) payable public returns(bool success) {

        _mint(msg.sender, amount);
        return true;
    }

}