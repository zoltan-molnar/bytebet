pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract ByteBetToken is MintableToken {

  string public constant name = "Byte Bet Token";
  string public constant symbol = "BBET";
  uint8 public constant decimals = 18;

}

contract ByteBetCrowdsale is CappedCrowdsale, RefundableCrowdsale {

  function ByteBetCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, uint256 _goal, uint256 _cap, address _wallet)
    CappedCrowdsale(_cap)
    FinalizableCrowdsale()
    RefundableCrowdsale(_goal)
    Crowdsale(_startTime, _endTime, _rate, _wallet)
  {
    //As goal needs to be met for a successful crowdsale
    //the value needs to less or equal than a cap which is limit for accepted funds
    require(_goal <= _cap);

    token.mint(_wallet, 100000 ether);
  }

  function createTokenContract() internal returns (MintableToken) {
    return new ByteBetToken();
  }

  function finalization() internal {
    token.transferOwnership(owner);

    super.finalization();
  }

}
