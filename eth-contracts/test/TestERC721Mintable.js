var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const deployer = accounts[0];
    const firstAccount = accounts[1];
    const secondAccount = accounts[2];

    const tokenName = "Kattan Token";
    const tokenSymbol = "KTN";

    let accountsCount = 5;
    

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await CustomERC721Token.new(tokenName, tokenSymbol, { from: deployer });

            // TODO: mint multiple tokens
            for (let i = 1; i <= accountsCount; i++) {
                await this.contract.mint(accounts[i], i, { from: accounts[0] });
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, accountsCount, "Total supply is incorrect");
        })

        it('should get token balance', async function () {
            for (let i = 1; i <= accountsCount; i++) {
                const tokenCount = await this.contract.balanceOf(accounts[i]);
                assert.equal(tokenCount, 1, `Account(${i}) balance is incorrect`)
            }  
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenURI = await this.contract.tokenURI(1);
            const expectedURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";

            assert.equal(tokenURI, expectedURI, "Incorrect Token URI");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.safeTransferFrom(firstAccount, secondAccount, 1, {from: firstAccount});
            let newOwner = await this.contract.ownerOf(1);
            assert.equal(newOwner, secondAccount, "Token was not transfered");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new(tokenName, tokenSymbol, {from: deployer});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let minted = false;
            try {
                minted = await this.contract.mint(firstAccount, accountsCount + 1, { from: firstAccount });
            } catch(err) {}
            assert.equal(minted, false, "UnAuthorized account minted new token")
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, deployer, "Contract owner is not the deployer");
        })
    });
})