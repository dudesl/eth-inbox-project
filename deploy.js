const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require ('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'capable spoon clerk edit spawn raccoon float power organ assault unfold excuse',
    'https://rinkeby.infura.io/v3/ca878bf69019454cb5e1e3b038fa85f7'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data:bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to ', result.options.address);
}
deploy();