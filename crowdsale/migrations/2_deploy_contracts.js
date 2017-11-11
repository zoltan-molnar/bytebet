var ByteBetCrowdsale = artifacts.require("ByteBetCrowdsale");

module.exports = function(deployer, network, accounts) {
    const seconds = 1;
    const minutes = 60 * seconds;
    const hours = 60 * minutes;
    const days = 24 * hours;
    const weeks = 7 * days;

    const preStartTime = web3.eth.getBlock('latest').timestamp + 1
    const preEndTime = preStartTime + (15 * seconds)
    const startTime = preEndTime
    const endTime = startTime + (15 * seconds)

    const wallet = "0x49fdcd92118bfef5c0517d31d24259bfe9854b8d"

    console.log("preStartTime", preStartTime);
    console.log("preEndTime", preEndTime);
    console.log("startTime", startTime);
    console.log("endTime", endTime);
    console.log("wallet", wallet);
  
    deployer.deploy(ByteBetCrowdsale, preStartTime, preEndTime, startTime, endTime, wallet, {gas: 5000000})
};
