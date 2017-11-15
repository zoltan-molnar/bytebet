module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: "3",
      from: "0xab379b2255b66c2829ed74b7e7d6a51e090904f8",
      gas: 4500000,
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 500000,
      from: "0x49fdcd92118bfef5c0517d31d24259bfe9854b8d",
    },
    live: {
      network_id: 1,
      host: "127.0.0.1",
      port: 8546,
      from: "0x006e5b6b52a1d85fe16e3b040d211bc23ed98f8a",
      gas: 2200000,
    }
  },
	solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	},
};
