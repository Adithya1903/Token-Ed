const { ethers } = require("hardhat");

async function main() {
    // Deploy Base Contracts First
    const Badge = await ethers.getContractFactory("Badge");
    const badge = await Collection.deploy();
    await badge.deployed();

    const SchoolUtilityTokens = await ethers.getContractFactory("SchoolUtilityTokens");
    const sut = await SchoolUtilityTokens.deploy(badge.address, collection.address);
    await sut.deployed();

    const Organization = await ethers.getContractFactory("Organization");
    const organization = await Community.deploy();
    await organization.deployed();



    console.log(collection.address, "Collection base contract address");
    console.log(community.address, "Community base contract address");
    console.log(cpf.address, "Minimal Proxy Community Factory contract address");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }