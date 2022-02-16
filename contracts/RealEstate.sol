// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract RealEstate {

  //Object
  struct Property {
    uint id;
    string name;
    address owner;
    string location;
    uint cost;
  }

  //List of property
  mapping (uint => Property) properties;

  //Contract publisher
  address public admin;

  //Land ID Counters
  uint public propertyCounter;

  //constructor to initialize admin and Land Counter
     constructor() {
        admin = msg.sender;
        propertyCounter = 0;
    }

  //modifier to verify sender is admin
  modifier isAdmin() {
    require(msg.sender == admin);
    _;
  }

  //event for Property Addition
  event Add(address _owner, uint _id);

  //event for Property transfer
  event Transfer(address indexed _from, address indexed _to, uint _land);

  //Function for adding/registering new land Ownership | Can only be executed by Contract Admin
  function addProperty(string memory _name, string memory _location, uint _cost) public isAdmin{
    //Increase Property Counter by 1
    propertyCounter++;
    //Save New Property
    properties[propertyCounter] = Property(propertyCounter, _name,msg.sender,_location,_cost);

    //Notify about Property Creation
    emit Add(msg.sender, propertyCounter);
  }

  //Function for transferring Property
  function transferProperty(address _buyer, uint _id) public returns (bool) {
    //Validate Sender is Property Owner
    require(msg.sender == properties[_id].owner);

    //Change Property Ownership
    properties[_id].owner = _buyer;

    //Notify transfer of Property Ownership
    emit Transfer(msg.sender, _buyer, _id);

    return true;
  }

  function fetchProperty(uint _id) public view returns (uint, string memory, address, string memory, uint) {
    uint i = find(_id);
    return (
      properties[_id].id,
      properties[_id].name,
      properties[_id].owner,
      properties[_id].location,
      properties[_id].cost
    );
  }

  function find(uint _id) view internal returns (uint) {
    for(uint i = 0; i < 10; i++){
      if(properties[i].id == _id){
        return i;
      }
    }
    revert('Property does not exist!');
  }
}
