const RealEstate = artifacts.require("RealEstate");

//Deploy Real Estate Smart Contract
describe('RealEstate', () => {
    it('Should deploy Smart Contract Properly', async () => {
        const realEstate = await RealEstate.deployed();
        //check of contract address is not an empty string
        assert(realEstate.address != '');
    })
});

//Add Property
contract('RealEstate', (accounts) => {
    let realEstate = null;
    before(async() => {
        realEstate = await RealEstate.new();
    });

    it('Should add new Property', async () => {

        const admin = accounts[0];
        const property_id = 1;
        const property_name = "Allan Okoth";
        const property_location = "Nairobi Kenya";
        const property_cost = 10;
        await realEstate.addProperty(property_name, property_location, property_cost, { from: admin});
        const property = await realEstate.fetchProperty(property_id);

        assert(property[0].toNumber() === property_id);
        assert(property[1] === property_name);
        assert(property[2] === admin);
        assert(property[3] === property_location);
        assert(property[4].toNumber() === property_cost);
        
    });

    it('Should change/update Property Owner', async () => {

        const admin = accounts[0];
        const recipient = accounts[1];
        const property_id = 1;
        await realEstate.transferProperty(recipient, property_id, { from: admin});
        const property = await realEstate.fetchProperty(property_id);
        assert(property[2] === recipient);
    });
});