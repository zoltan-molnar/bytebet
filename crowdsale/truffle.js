module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
    host: "localhost",
    port: 8545,
    network_id: "*", // Match any network id
    gas: 5000000,
    from: "0x49fdcd92118bfef5c0517d31d24259bfe9854b8d"
   }
  }
};
