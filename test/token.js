const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Total supply to owner address is being tested here : ", function () {
//   it("Deployment TestRunner", async function () {
//     const [owner] = await ethers.getSigners();

//     //console.log("Signature object : ", owner);
//     const Token = await ethers.getContractFactory("Token");

//     const hardhatToken = await Token.deploy();

//     const ownerBalance = await hardhatToken.balanceOf(owner.address);

//     console.log("Owners address : ", owner.address);

//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });
// });

// describe("Transfer function is being tested here : ", function () {
//     it("Deployment TestRunner", async function () {
//       const [owner, account1, account2] = await ethers.getSigners();

//       //console.log("Signature object : ", owner);
//       const Token = await ethers.getContractFactory("Token");

//       const hardhatToken = await Token.deploy();

//       await hardhatToken.transfer(account1.address, 50);
//       expect(await hardhatToken.balanceOf(account1.address)).to.equal(50);

//       await hardhatToken.connect(account1).transfer(account2.address, 10);
//       expect(await hardhatToken.balanceOf(account2.address)).to.equal(10);
//     });
//   });

// ? testing using waffle chai hook functionality.

describe("Token Contract", function () {
  let token;
  let hardhatToken;
  let owner;
  let account1;
  let account2;
  let accounts;

  beforeEach(async function () {
    token = await ethers.getContractFactory("Token");
    [owner, account1, account2, ...accounts] = await ethers.getSigners();
    hardhatToken = await token.deploy();
  });

  describe("Deployment Function", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply to owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe("Transaction", function () {
    it("Should transfer tokens", async function () {
      await hardhatToken.transfer(account1.address, 50);
      const account1balance = await hardhatToken.balanceOf(account1.address);
      expect(account1balance).to.equal(50);

      await hardhatToken.connect(account1).transfer(account2.address, 10);
      const account2balance = await hardhatToken.balanceOf(account2.address);
      expect(account2balance).to.equal(10);
    });

    it("Should fail if sender dont have enough token", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(account1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough to transfer");
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
    it("Should check the balance after transfer", async function () {
      const initialAccount1Balance = await hardhatToken.balanceOf(account1.address);
      await hardhatToken.transfer(account1.address, 10);
      const finalAccount1balance = await hardhatToken.balanceOf(account1.address);
      expect(initialAccount1Balance+10).to.equal(finalAccount1balance);
    });
  });
});
