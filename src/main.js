let accounts;
let provider;
let abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "Add",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_land",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "addProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "fetchProperty",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "propertyCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "transferProperty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

let realEstateContract_address = "0xae038A810Fe0938823AFC68533f1A0068B9c93e7";


window.onload = function () {
    this.console.log("Dapp is Loaded");

    if (window.ethereum) {
        //we can access web3!
        this.ethereum.on('accountsChanged', handleAccountsChanged);

        window.ethereum.request({ method: 'eth_accounts' })
            .then(handleAccountsChanged)
            .catch((err) => {
                console.log(err);
            });

            //provider = new ethers.providers.JsonRpcProvider();
            provider = new ethers.providers.Web3Provider(window.ethereum);
            this.console.log(provider);
    } else {
        this.console.log("Please install a digital wallet like Metamark");
    }
}

const handleAccountsChanged = async (a) => {
    console.log("Accounts changed");
    accounts = a;
    console.log(accounts);
}

//Connecting User to Wallet
const connectWallet = async () => {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
	.catch((err) => {
        //Error handling
        console.log(err.code);
    })

    console.log(accounts);
}

const addProperty = async () => {
    try {

        let property_name = document.getElementById("pname").value;
        let property_location = document.getElementById("plocation").value;
        let property_cost = document.getElementById("pcost").value;

        console.log(property_name);
        console.log(property_location);
        console.log(property_cost);

        let signer = provider.getSigner();
        let realEstateContract = new ethers.Contract(realEstateContract_address, abi, signer);
        let newProperty = await realEstateContract.addProperty(property_name, property_location, property_cost);
        console.log(newProperty);
        newPropertyEvent();

    } catch (error) {
        console.log(error);
    }

}

const newPropertyEvent = async () => {
    let realEstateContract = new ethers.Contract(realEstateContract_address, abi, provider);
    realEstateContract.on("Add", (_owner, _id) => {
        console.log(_owner, _id);
        console.log("Property Added");
    })
}

const transferProperty = async () => {
    try {

        let signer = provider.getSigner();
        let realEstateContract = new ethers.Contract(realEstateContract_address, abi, signer);
        let transferListing = realEstateContract.transferProperty("0xc30E3858Be580aAE5d272f45e7eEA7469e77E586", 2);
        //transferPropertyEvent();
        console.log(transferListing);
        
    } catch (error) {
        console.log(error);
    }
}

const transferPropertyEvent = async () => {

    let realEstateContract = new ethers.Contract(realEstateContract_address, abi, provider);
    realEstateContract.on("Transfer", (_from, _to, _land) => {
        console.log(_from, _to, _land);
        console.log("Transferred Land");
    })
}

const fetchProperty = async () => {

    try {
        let realEstateContract = new ethers.Contract(realEstateContract_address, abi, provider);
        let readProperty = await realEstateContract.fetchProperty(2);
        console.log(readProperty);
    } catch (error) {
        console.log(error);
    }
}
