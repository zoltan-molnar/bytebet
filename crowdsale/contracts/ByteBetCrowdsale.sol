pragma solidity ^0.4.11;

import './ByteBetToken.sol';
import './zeppelin-contracts/token/MintableToken.sol';
import './zeppelin-contracts/math/SafeMath.sol';
import './zeppelin-contracts/crowdsale/RefundVault.sol';
import './zeppelin-contracts/ownership/Ownable.sol';

contract ByteBetCrowdsale is Ownable {
  using SafeMath for uint256;

  // The token being sold
  MintableToken public token;

  // start and end timestamps where investments are allowed (both inclusive)
  uint256 public preStartTime;
  uint256 public preEndTime;
  uint256 public startTime;
  uint256 public endTime;

  uint256 public preCap;
  uint256 public preGoal;
  uint256 public mainCap;
  uint256 public mainGoal;

  // address where funds are collected
  address public wallet;

  // amount of raised money in wei
  uint256 public weiRaised;

  // refund vault used to hold funds while crowdsale is running
  RefundVault public vault;

  bool public isFinalized = false;

  event Finalized();

  /**
   * event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param amount amount of tokens purchased
   */
  event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);


  function ByteBetCrowdsale(uint256 _preStartTime, uint256 _preEndTime, uint256 _startTime, uint256 _endTime, address _wallet) public {

    require(_preStartTime >= now);
    require(_preEndTime >= _preStartTime);
    require(_startTime >= _preEndTime);
    require(_endTime >= _startTime);
    require(_wallet != 0x0);

    token = new ByteBetToken();
    preStartTime = _preStartTime;
    preEndTime = _preEndTime;
    startTime = _startTime;
    endTime = _endTime;
    wallet = _wallet;
    vault = new RefundVault(wallet);

    preGoal = 150 ether;
    preCap = 600 ether;
    mainGoal = 3000 ether;
    mainCap = 50000 ether;

    token.mint(wallet, 100000 ether);
  }

  // creates the token to be sold.
  // override this method to have crowdsale of a specific mintable token.
  function createTokenContract() internal returns (MintableToken) {
    return new MintableToken();
  }


  // fallback function can be used to buy tokens
  function () public payable {
    buyTokens(msg.sender);
  }

  // low level token purchase function
  function buyTokens(address beneficiary) public payable {
    require(beneficiary != 0x0);
    require(validPurchase());

    uint256 weiAmount = msg.value;

    uint256 rate = getRate();
 
    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    // update state
    weiRaised = weiRaised.add(weiAmount);

    token.mint(beneficiary, tokens);
    TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

    forwardFunds();
  }

  function getRate() public constant returns (uint256) {
    if (preStartTime <= now && now <= preEndTime) {
      return uint256(130);
    }
    if (startTime <= now && now <= startTime + 1 days) {
      return uint256(125);
    }
    if (startTime + 1 days < now && now <= startTime + 1 weeks) {
      return uint256(115);
    }
    if (startTime + 1 weeks < now && now <= endTime ) {
      return uint256(110);
    }
    revert();
  }

  // @return true if the transaction can buy tokens
  function validPurchase() internal constant returns (bool) {
    bool withinPeriod = (preStartTime <= now && now <= preEndTime) || (startTime <= now && now <= endTime);
    bool nonZeroPurchase = msg.value != 0;
    bool prePendingOrSuccess = now <= preEndTime || weiRaised > preGoal;

    bool withinCap = false;

    if (preStartTime <= now && now <= preEndTime) {
      withinCap = weiRaised.add(msg.value) <= preCap;
    } else {
      withinCap = weiRaised.add(msg.value) <= mainCap;
    }
    
    return withinPeriod && nonZeroPurchase && withinCap && prePendingOrSuccess;
  }

  // @return true if crowdsale event has ended
  function hasEnded() public constant returns (bool) {
    bool mainCapReached = weiRaised >= mainCap;

    return (now > endTime) || mainCapReached;
  }

  // We're overriding the fund forwarding from Crowdsale.
  // In addition to sending the funds, we want to call
  // the RefundVault deposit function
  function forwardFunds() internal {
    vault.deposit.value(msg.value)(msg.sender);
  }

  // if crowdsale is unsuccessful, investors can claim refunds here
  function claimRefund() public {
    require(isFinalized);
    require(!goalReached());

    vault.refund(msg.sender);
  }

  // vault finalization task, called when owner calls finalize()
  function finalization() internal {
    if (goalReached()) {
      vault.close();
      uint256 raised = token.totalSupply().sub(100000 ether);
      // Sending 50% as team bonus
      token.mint(wallet, raised);
    } else {
      vault.enableRefunds();
    }
  }

  function goalReached() public constant returns (bool) {
    return weiRaised >= mainGoal;
  }

  function hasPreFailed() public constant returns (bool) {
    if (preEndTime < now && weiRaised < preGoal) {
      return true;
    }
    return false;
  }

  function finalize() onlyOwner public {
    require(!isFinalized);
    require(hasEnded() || hasPreFailed());

    finalization();
    Finalized();

    isFinalized = true;
  }

}
