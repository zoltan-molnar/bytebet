var ByteBetCrowdsale = artifacts.require("ByteBetCrowdsale");

module.exports = function(deployer, network, accounts) {
    const now = Math.floor((new Date()).getTime() / 1000);
    
    const seconds = 1;
    const minutes = 60 * seconds;
    const hours = 60 * minutes;
    const days = 24 * hours;
    const weeks = 7 * days;
 
    const startTime = web3.eth.getBlock('latest').timestamp + 15 * minutes;
    const endTime = startTime + (15 * minutes);
    const rate = 130;
    const goal = web3.toWei(150, "ether");
    const cap = web3.toWei(600, "ether");
    const wallet = "0xab379b2255b66c2829ed74b7e7d6a51e090904f8"

    console.log("startTime", startTime);
    console.log("endTime", endTime);
    console.log("rate", rate);
    console.log("goal", goal);
    console.log("cap", cap);
    console.log("wallet", wallet);

    // uint256 _startTime, uint256 _endTime, uint256 _rate, uint256 _goal, uint256 _cap, address _wallet
    deployer.deploy(ByteBetCrowdsale, startTime, endTime, rate, goal, cap, wallet, {gas: 4500000})
};
