pragma solidity ^0.4.11;

import "./zeppelin-contracts/token/MintableToken.sol";

/**
 * @title SampleCrowdsaleToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract ByteBetToken is MintableToken {

  string public constant name = "Byte Bet Token";
  string public constant symbol = "BBET";
  uint8 public constant decimals = 18;

}
