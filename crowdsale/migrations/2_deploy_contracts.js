var ByteBetCrowdsale = artifacts.require("ByteBetCrowdsale");

module.exports = function(deployer, network, accounts) {
    const startTime = 1511287200; // Tuesday, 21 November 2017 18:00:00
    const endTime = 1511978400; // Wednesday, 29 November 2017 18:00:00
    const rate = 130;
    const goal = web3.toWei(150, "ether");
    const cap = web3.toWei(600, "ether");
    const wallet = "0x7FDEDa642F9aD839a024612EA1c7B8860D609d71"

    // uint256 _startTime, uint256 _endTime, uint256 _rate, uint256 _goal, uint256 _cap, address _wallet
    deployer.deploy(ByteBetCrowdsale, startTime, endTime, rate, goal, cap, wallet)
};
