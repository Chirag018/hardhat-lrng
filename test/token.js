const { expect } = require('chai');
const { ethers } = require('hardhat');

//since this approach is lengthy and repetative we will use the optimized one
describe('Token Contract', function () {
  it('Deployment should assign the total supply of tokens to the server', async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('Token');
    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  })

  it('Should transfer tokens between accounts', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('Token');
    const hardhatToken = await Token.deploy();

    //transfer 10 tokens to addr1
    await hardhatToken.transfer(addr1.address, 10);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

    //transfer 5 tokens to addr2
    await hardhatToken.transfer(addr2.address, 5);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);

  })

})