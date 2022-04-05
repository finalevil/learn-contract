const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")
const amount = [2, 3, 6]

describe("TestToken", function () {
  let TestTokenUpgradeable

  beforeEach(async function () {
    TestTokenUpgradeable = await ethers.getContractFactory("TestTokenUpgradeable")
  })

  it("transfer from owner to address1, and from address1 to address2", async function () {
    const [owner, user1, user2] = await ethers.getSigners()
    const testTokenUpgradeable = await TestTokenUpgradeable.deploy()
    await testTokenUpgradeable.initializeToken(10, 100)
    const amountOfTransfer = 10
    await testTokenUpgradeable.transfer(user1.address, amountOfTransfer)
    const balanceOfUser1 = await testTokenUpgradeable.balanceOf(user1.address)
    expect(balanceOfUser1).to.equal(amountOfTransfer)

    await testTokenUpgradeable.connect(user1).transfer(user2.address, amountOfTransfer)

    const balanceOfUser2 = await testTokenUpgradeable.balanceOf(user2.address)
    expect(balanceOfUser2).to.equal(amountOfTransfer)
  })

  it.skip("total supply equal owner balance", async function () {
    const [owner] = await ethers.getSigners()
    const testTokenUpgradeable = await TestTokenUpgradeable.deploy()
    await testTokenUpgradeable.deployed()
    await testTokenUpgradeable.initializeToken(2, 10)
    const ownerBalance = await testTokenUpgradeable.balanceOf(owner.address)
    expect(await testTokenUpgradeable.totalSupply()).to.equal(ownerBalance)
  })

  it.skip("only owner can mint", async function () {
    const [_, adddress1] = await ethers.getSigners()
    try {
      const testTokenUpgradeable = await TestTokenUpgradeable.deploy()
      await testTokenUpgradeable.deployed()
      await testTokenUpgradeable.mint(adddress1.address, amount[0])
    } catch (err) {
      expect(err.message.indexOf("Ownable: caller is not the owner")).to.not.equal(-1)
    }
  })

  it.skip("mint token multiple times, but can't over cap num", async function () {
    const [owner] = await ethers.getSigners()
    const testTokenUpgradeable = await TestTokenUpgradeable.deploy()
    await testTokenUpgradeable.deployed()

    await testTokenUpgradeable.initializeToken(amount[0], 10)
    await testTokenUpgradeable.mint(owner.address, amount[1])
    expect(await testTokenUpgradeable.totalSupply()).to.equal(BigNumber.from(amount[0] + amount[1]))

    try {
      await testTokenUpgradeable.mint(owner.address, amount[2])
    } catch (err) {
      expect(err.message.indexOf("ERC20Capped: cap exceeded")).to.not.equal(-1)
    }
  })

  it.skip("token amount should not over cap num", async function () {
    const TestTokenUpgradeable = await ethers.getContractFactory("TestTokenUpgradeable")
    const testTokenUpgradeable = await TestTokenUpgradeable.deploy()
    await testTokenUpgradeable.deployed()
    try {
      await testTokenUpgradeable.initializeToken(11, 10)
    } catch (err) {
      expect(err.message.indexOf("ERC20Capped: cap exceeded")).to.not.equal(-1)
    }
  })
})
