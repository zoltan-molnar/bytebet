var ByteBetCrowdsale = artifacts.require("ByteBetCrowdsale");

module.exports = function(deployer, network, accounts) {
    const now = Math.floor((new Date()).getTime() / 1000);
    
    const seconds = 1;
    const minutes = 60 * seconds;
    const hours = 60 * minutes;
    const days = 24 * hours;
    const weeks = 7 * days;

    const preStartTime = web3.eth.getBlock('latest').timestamp + 5 * minutes
    const preEndTime = preStartTime + (15 * minutes)
    const startTime = preEndTime
    const endTime = startTime + (15 * minutes)

    const wallet = "0x00D75b582f6387dDb9fc0f7517350Ed7Ce6B50De"

    console.log("preStartTime", preStartTime);
    console.log("preEndTime", preEndTime);
    console.log("startTime", startTime);
    console.log("endTime", endTime);
    console.log("wallet", wallet);
  
    deployer.deploy(ByteBetCrowdsale, preStartTime, preEndTime, startTime, endTime, wallet, {gas: 5000000})
};
