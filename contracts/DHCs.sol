// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ownable{

    address public superAdmin;
    mapping(address=>bool) isSupAdmin;
    mapping(address=>bool) isAgency;

    event SuperAdminChanged(address indexed _from,address indexed _to);
    event SupAdminAdded(address indexed SupAdmin_address);
    event SupAdminRemoved(address indexed SupAdmin_address);
    event AgencyAdded(address indexed Agency_address);
    event AgencyRemoved(address indexed Agency_address);

    constructor()public{
        superAdmin=msg.sender;
    }

    modifier onlySuperAdmin(){
        require(superAdmin == msg.sender, "Only the superAdmin has permission to this action");
        _;
    }
    modifier onlySubAdmin(){
        require(isSupAdmin[msg.sender] == true, "Only superAdmin has permission to this action");
        _;
    }
    modifier onlyAgency(){
        require(isAgency[msg.sender] == true, "Only ageny has permission to this action ");
        _;
    }
    function setSuperAdmin(address _superAdmin) public onlySuperAdmin returns(bool success){
        require(_superAdmin!=msg.sender,"Already your the superAdmin");
        superAdmin=_superAdmin;
        emit SuperAdminChanged(msg.sender, _superAdmin);
        return true;
    }

    function addSupAdmin(address _address) public onlySuperAdmin returns(bool success){
        require(!isSupAdmin[_address],"user already SupAdmin");
        isSupAdmin[_address] = true;
        emit SupAdminAdded(_address);
        return true;
    }

    function removeSubAdmin(address _address) public onlySuperAdmin returns(bool success){
        require(isSupAdmin[_address],"user is not yet a SupAdmin");
        isSupAdmin[_address] = false;
        emit SupAdminRemoved(_address);
        return true;
    }
    function addAgency(address _address) public onlySubAdmin returns(bool success){
        require(!isAgency[_address],"user already Agency");
        isAgency[_address] = true;
        emit AgencyAdded(_address);
        return true;
    }
    function removeAgency(address _address) public onlySubAdmin returns(bool success){
        require(isAgency[_address],"user is not yet an Agency");
        isAgency[_address] = false;
        emit AgencyRemoved(_address);
        return true;
    }
}


contract Issure is ownable{

    uint256 public index;
    mapping(address=>bool) isIssure;
    
    struct issure {
        uint256 id;
        string iname;
        string iaddress;
        string icontact;
        address addr;
        bool isApproved;
    }
    mapping(address=>issure) issures;
    address[] public IssureList;

    modifier onlyIssure(){
        require(isIssure[msg.sender], "Only Issuers can Issue Records");
        _;
    }

    function addIssure(string memory _iname, string memory _iaddress, string memory _icontact, address _addr) public onlyAgency {
        require(!isIssure[_addr],"Already an Issure!");
        IssureList.push(_addr);
        index = index + 1;
        isIssure[_addr]=true;
        issures[_addr]=issure(index,_iname,_iaddress,_icontact,_addr,true);
    }

    function getIssureByAddress(address _address) public view returns(uint256 _id,string memory iname,string memory iaddress,string memory icontact,address addr,bool isApproved) {
        require(issures[_address].isApproved,"Issure is not approved or doesn't exist");
        issure memory tmp = issures[_address];
        return(tmp.id, tmp.iname, tmp.iaddress, tmp.icontact, tmp.addr, tmp.isApproved);
    }
}

contract Patient is Issure{
    uint256 public uindex = 0;

    struct Certificate {
        string iname;
        string pname;
        string reason;
        string admittedOn;
        string dischargedOn;
        string ipfs;
    }
    
    struct patient{
        Certificate[] certificates;
        address addr;
    }

    mapping(address=>patient) patients;
    mapping(address=>bool) isPatient;

    function IssueCertificates(address _addr, string memory _iname, string memory _pname, string memory _reason, string memory _admittedOn, string memory _dischargedOn,string memory _ipfs) public onlyIssure{
        patients[_addr].certificates.push(Certificate(_iname,_pname, _reason, _admittedOn, _dischargedOn, _ipfs));
    }
    function getPatienCertificates(address _addr) public view onlyAgency returns(string[] memory _hname, string[] memory _pname, string[] memory _reason, string[] memory _admittedOn, string[] memory _dishchargedOn, string[] memory ipfs) {
        require(patients[_addr].certificates.length>0, "patient dosen't have a certificates");

        string[] memory Hname = new string[](patients[_addr].certificates.length);
        string[] memory Pname = new string[](patients[_addr].certificates.length);
        string[] memory Reason = new string[](patients[_addr].certificates.length);
        string[] memory AdmOn = new string[](patients[_addr].certificates.length);
        string[] memory DisOn = new string[](patients[_addr].certificates.length);
        string[] memory IPFS = new string[](patients[_addr].certificates.length);

        for(uint256 i=0;i<patients[_addr].certificates.length;i++){
            Hname[i]=patients[_addr].certificates[i].iname;
            Pname[i]=patients[_addr].certificates[i].pname;
            Reason[i]=patients[_addr].certificates[i].reason;
            AdmOn[i]=patients[_addr].certificates[i].admittedOn;
            DisOn[i]=patients[_addr].certificates[i].dischargedOn;
            IPFS[i]=patients[_addr].certificates[i].ipfs;
        }
        return (Hname,Pname,Reason,AdmOn,DisOn,IPFS);
    }
}