var myL2token = artifacts.require("./contracts/BlockBoosted.sol");

module.exports = function(deployer) {
  deployer.deploy(myL2token, 100000);
};
