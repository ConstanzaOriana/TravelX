
const hre = require("hardhat");
const signers = {};
let owner;

//Deploy NFTTicketTransfer contract
async function main() {
  [owner] = await ethers.getSigners();
  const NftTransfer = await hre.ethers.getContractFactory("NFTTicketTransfer");
  const NftTransferInstance = await NftTransfer.deploy(/*Pasar los argumentos de ambas address*/);
  await NftTransferInstance.deployed();

  console.log(
    `NftTransfer CONTRACT:  ${NftTransferInstance.address} || 
    Deployed by ${owner.address}`
  );
};

//Deploy NFTicket contract
async function main() {
  [owner] = await ethers.getSigners();
  const NFTicket = await hre.ethers.getContractFactory("NFTicket");
  const NftTicketInstance = await NFTicket.deploy(/*Pasar los argumentos de la splitter address*/);
  await NftTicketInstance.deployed();

  console.log(
    `NFTicket CONTRACT:  ${NftTicketInstance.address} || 
    Deployed by ${owner.address}`
  );
};

//Deploy Stablecoin contract
async function main() {
  [owner] = await ethers.getSigners();
  const Stablecoin = await hre.ethers.getContractFactory("Stablecoin");
  const StablecoinInstance = await Stablecoin.deploy(0);
  await StablecoinInstance.deployed();

  console.log(
    `Stablecoin CONTRACT:  ${StablecoinInstance.address} || 
    Deployed by ${owner.address}`
  );
};

//Mint and create ticket

async function main(){
  let sigAddrs = {};
  nftTokenCreatorFactory = await ethers.getContractFactory("NFTicket");
  nftTokenCreatorInstance = await nftTokenCreatorFactory.deploy(sigAddrs.deployer);
  nftTokenCreatorAddress = nftTokenCreatorInstance.address;
  await nftTokenCreatorInstance.deployed();
  let nftOwner = await nftTokenCreatorInstance.owner();
  expect(nftOwner).to.equal(sigAddrs.deployer);    
  const balanceBefore = await nftTokenCreatorInstance.balanceOf(NftTransferAddress);
  let createTxn = await NftTransferInstance.createTicket(1672341981);
  await createTxn.wait();
  let nftTicket = await nftTokenCreatorInstance.tickets(0);
  const balanceAfter = await nftTokenCreatorInstance.balanceOf(NftTransferAddress);
  const ticketPrice = await nftTokenCreatorInstance.getTicketPrice(0);
  const ticketDeadLine = nftTicket.nftDeadlineTransfer;
  expect(balanceAfter).to.equal(balanceBefore + 1);
  expect(ticketPrice).to.equal(0);
  expect(ticketDeadLine).to.equal(1672341981);
  const ticketOwner = await nftTokenCreatorInstance.ownerOf(0);
  expect(ticketOwner).to.equal(NftTransferAddress);
}

//Sell ticket

//Buy ticket

//stopSell Ticket



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
