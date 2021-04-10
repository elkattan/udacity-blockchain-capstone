// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var CustomERC721Token = artifacts.require("./CustomERC721Token.sol");

module.exports = function(deployer) {
  deployer.deploy(Verifier);
  deployer.deploy(SolnSquareVerifier, "Kattan", "KTN");
};
