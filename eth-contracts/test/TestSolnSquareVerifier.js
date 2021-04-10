let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

contract("SolnSquareVerifier", (accounts) => {

    const deployer = accounts[0];
    const firstAccount = accounts[1];

    const tokenName = "Kattan Token";
    const tokenSymbol = "KTN";

    // Test if a new solution can be added for contract - SolnSquareVerifier
    describe('Test contract for ZK and ERC721 integration', () => {
        beforeEach(async () => {
            if (!this.contract) this.contract = await SolnSquareVerifier.new(tokenName, tokenSymbol, { from: deployer });
        });

        it("Test if a new solution can be added for contract", async () => {
            let proof = require("../../zokrates/code/square/proof.json");
            await this.contract.addSolution(
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                { from: firstAccount }
            );
            const exists = await this.contract.solutionExists(firstAccount);
            assert.equal(exists, true, "Solution was not added");
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it("Test if an ERC721 token can be minted for contract", async () => {
            const minted = await this.contract.mintNFT.call(firstAccount, 20, { from: firstAccount });
            assert.equal(minted, true, "Token was not minted");
        });
    });
});


    


