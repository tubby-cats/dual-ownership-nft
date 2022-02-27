const { expect } = require("chai");
const { ethers } = require("hardhat");

const msigError = 'MultisigOwnable: caller is not the real owner'

describe("MultisigOwnable", function () {
    it("hierarchical ownership works", async function () {
        const [owner, msig, attacker] = await ethers.getSigners();
        const Example = await hre.ethers.getContractFactory("Example");
        const exampleContract = await Example.deploy();
        await exampleContract.deployed();
        
        expect(await exampleContract.owner()).to.equal(owner.address)
        expect(await exampleContract.realOwner()).to.equal(owner.address)
        await exampleContract.transferRealOwnership(msig.address);
        expect(await exampleContract.realOwner()).to.equal(msig.address)
        await expect(
            exampleContract.connect(owner).retrieveFunds(msig.address)
        ).to.be.revertedWith(msigError);
        await expect(
            exampleContract.connect(attacker).retrieveFunds(msig.address)
        ).to.be.revertedWith(msigError);
        await exampleContract.connect(msig).retrieveFunds(attacker.address)

        await exampleContract.connect(msig).transferLowerOwnership(attacker.address)
        expect(await exampleContract.owner()).to.equal(attacker.address)

        await expect(
            exampleContract.connect(attacker).transferLowerOwnership(attacker.address)
        ).to.be.revertedWith(msigError);
        await expect(
            exampleContract.connect(attacker).transferRealOwnership(attacker.address)
        ).to.be.revertedWith(msigError);

        await exampleContract.connect(msig).transferRealOwnership(attacker.address)

        expect(await exampleContract.realOwner()).to.equal(attacker.address)
        await expect(
            exampleContract.connect(msig).retrieveFunds(msig.address)
        ).to.be.revertedWith(msigError);
    })
})