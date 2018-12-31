const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');

/* Ganache Unlocked Accounts
'0x5f53b9373bde8A08bCD5e2Bb545384453efFA232',
'0x7e43473c6b3F0278040e7d9752D192FFB9238D7E',
'0xDDEd9d686B9D396D384BcdDfa224eFD070641b9D',
'0x1E6c97c25E4813C7c83d9fDe9ba43aBc68ca64fc',
'0xf575933fb0ed8DF81687e75Ca6e998c8d2C15cEf',
'0x5CB95c406353164560BC8919FBFe2527368BD684',
'0xbFCd743aa219897F32a7EB639BCEA1A9F68a1bfD',
'0xF15C0167428C6575682E8cCc169439a841137D63',
'0x692a5986E79dF54dFeF816C7996E70698a4Ec896',
'0xe9171048A98EbBf274EB66194176C2Bb8bbF3aF1'
 */

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach( async ()=> {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider);
});

describe('Inbox Contract', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });

})