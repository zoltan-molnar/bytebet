var ByteBetCrowdsale = artifacts.require("ByteBetCrowdsale"),
  ByteBetToken = artifacts.require("ByteBetToken");

contract('ByteBetCrowdsale', function(accounts) {
  it("should put 100000 ByteBetToken in the first account", function() {
    return ByteBetCrowdsale.deployed().then(function(instance) {
      return instance.token();
    }).then(function(addr) {
      return ByteBetToken.at(addr).balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(web3.fromWei(balance.valueOf(), 'ether'), 100000, "100000 wasn't in the first account");
    });
  });
  it("total initial minted supply should be 100000 ", function() {
    return ByteBetCrowdsale.deployed().then(function(instance) {
      return instance.token();
    }).then(function(addr) {
      return ByteBetToken.at(addr).totalSupply();
    }).then(function(balance) {
      assert.equal(web3.fromWei(balance.valueOf(), 'ether'), 100000, "100000 wasn't the total initial minted supply");
    });
  });
  it("account 1 should be able to invest 10 ETH for 1300 BBET", function() {
    var crowdsaleInstance;

    return ByteBetCrowdsale.deployed().then(function(instance) {
      crowdsaleInstance = instance;
      return crowdsaleInstance.sendTransaction({ from: accounts[1], value: web3.toWei(10, "ether") });
    }).then(function(trx) {
      return crowdsaleInstance.token();
    }).then(function(addr) {
      return ByteBetToken.at(addr).balanceOf(accounts[1]);
    }).then(function(balance) {
      assert.equal(web3.fromWei(balance.valueOf(), 'ether'), 1300, "1300 wasn't account 1's balance");
    });
  });
  it("account 2 should be able to invest 500 ETH for 65000 BBET", function() {
    var crowdsaleInstance;

    return ByteBetCrowdsale.deployed().then(function(instance) {
      crowdsaleInstance = instance;
      return crowdsaleInstance.sendTransaction({ from: accounts[2], value: web3.toWei(500, "ether") });
    }).then(function(trx) {
      return crowdsaleInstance.token();
    }).then(function(addr) {
      return ByteBetToken.at(addr).balanceOf(accounts[2]);
    }).then(function(balance) {
      assert.equal(web3.fromWei(balance.valueOf(), 'ether'), 65000, "65000 wasn't account 2's balance");
    });
  });
  it("account 3 should be able to invest 49490 ETH a bit later for 6186250 BBET", function() {
    var crowdsaleInstance;
  
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve()
        }, 1000 * 16);
      }).then(function () {
        return ByteBetCrowdsale.deployed();
      }).then(function(instance) {
        crowdsaleInstance = instance;
        return crowdsaleInstance.sendTransaction({ from: accounts[3], value: web3.toWei(49490, "ether") });
      }).then(function(trx) {
        return crowdsaleInstance.token();
      }).then(function(addr) {
        return ByteBetToken.at(addr).balanceOf(accounts[3]);
      }).then(function(balance) {
        assert.equal(web3.fromWei(balance.valueOf(), 'ether'), 6186250, "6186250 wasn't account 2's balance");
      });
  });
  it("we goal should be reached", function() {
      return ByteBetCrowdsale.deployed().then(function(instance) {
        return instance.goalReached();
      }).then(function(goalReached) {
        assert.equal(goalReached, true, "Goal is not reached");
      });
  });
  it("it should be ended", function() {
    return ByteBetCrowdsale.deployed().then(function(instance) {
      return instance.hasEnded();
    }).then(function(hasEnded) {
      assert.equal(hasEnded, true, "Has ended was false");
    });
  });
  it("we should be able to finalize it", function() {
    var instance;

    return ByteBetCrowdsale.deployed().then(function(i) {
      instance = i;
      return instance.finalize();
    }).then(function() {
      return instance.isFinalized();
    }).then(function(isFinalized) {
      assert.equal(isFinalized, true, "Has ended was false");
    });
  });
  it("the team wallet should have 6352550 BBET", function() {
    return ByteBetCrowdsale.deployed().then(function(instance) {
      return instance.token();
    }).then(function(addr) {
      return ByteBetToken.at(addr).balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(web3.fromWei(balance.valueOf(), 'ether'), 6352550, "Team wallet doesn't have the correct BBET");
    });
  });
});