// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract DHCs{

    uint256 public index;
    address public superAdmin;
    uint256 public uindex = 0;

    struct Country {
        string name;
        address addr;
    }

    struct Agency {
        string name;
        address addr;
    }

    struct issure {
        uint256 id;
        string iname;
        string iaddress;
        string icontact;
        address addr;
        bool isApproved;
    }

    struct Certificate {
        string iname;
        string pname;
        string reason;
        string admittedOn;
        string dischargedOn;
    }
    
    struct patient{
        Certificate[] certificates;
        address addr;
    }
    mapping (address=>Country) countries;
    mapping(address=>bool) isCountry;
    mapping(address=>Agency) agencies;
    mapping(address=>bool) isAgency;
    mapping(address=>issure) issures;
    mapping(address=>bool) isIssure;
    mapping(address=>patient) patients;
    mapping(address=>bool) isPatient;
    address[] public IssureList;
    

    event SuperAdminChanged(address indexed _from,address indexed _to);
    event CountryAdded(address indexed Country_address);
    event CountryRemoved(address indexed Country_address);
    event AgencyAdded(address indexed Agency_address);
    event AgencyRemoved(address indexed Agency_address);

    constructor()public{
        superAdmin=msg.sender;
    }

    modifier onlySuperAdmin(){
        require(superAdmin == msg.sender, "Only the superAdmin has permission to this action");
        _;
    }
    modifier onlyCountry(){
        require(isCountry[msg.sender] == true, "Only country has permission to this action");
        _;
    }
    modifier onlyAgency(){
        require(isAgency[msg.sender] == true, "Only ageny has permission to this action ");
        _;
    }
    modifier onlyIssure(){
        require(isIssure[msg.sender], "Only Issuers can Issue certificates");
        _;
    }
    function setSuperAdmin(address _superAdmin) public onlySuperAdmin returns(bool success){
        require(_superAdmin!=msg.sender,"Already your the superAdmin");
        superAdmin=_superAdmin;
        emit SuperAdminChanged(msg.sender, _superAdmin);
        return true;
    }

    function addCountry(string memory _name, address _address) public onlySuperAdmin returns(bool success){
        require(!isCountry[_address],"user already Country");
        isCountry[_address] = true;
        countries[_address].name = _name;
        countries[_address].addr = _address;
        emit CountryAdded(_address);
        return true;
    }

    function removeCountry(address _address) public onlySuperAdmin returns(bool success){
        require(isCountry[_address],"user is not yet a Country");
        isCountry[_address] = false;
        emit CountryRemoved(_address);
        return true;
    }
    function getCountryByAddress(address _address) public view returns(string memory _name,address _addr) {
        require(isCountry[_address],"Country is not approved or doesn't exist");
        Country memory tmp = countries[_address];
        return(tmp.name, tmp.addr);
    }
    function addAgency(string memory _name, address _address) public onlyCountry returns(bool success){
        require(!isAgency[_address],"user already Agency");
        isAgency[_address] = true;
        agencies[_address].name = _name;
        agencies[_address].addr = _address;
        emit AgencyAdded(_address);
        return true;
    }
    function removeAgency(address _address) public onlyCountry returns(bool success){
        require(isAgency[_address],"user is not yet an Agency");
        isAgency[_address] = false;
        emit AgencyRemoved(_address);
        return true;
    }
    function getAgencyByAddress(address _address) public view returns(string memory _name,address _addr) {
        require(isAgency[_address],"Agency is not approved or doesn't exist");
        Agency memory tmp = agencies[_address];
        return(tmp.name, tmp.addr);
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
    function IssueCertificates(address _addr, string memory _iname, string memory _pname, string memory _reason, string memory _admittedOn, string memory _dischargedOn) public onlyIssure{
        patients[_addr].certificates.push(Certificate(_iname,_pname, _reason, _admittedOn, _dischargedOn));
    }
    function getPatienCertificates(address _addr) public view returns(string[] memory _hname, string[] memory _pname, string[] memory _reason, string[] memory _admittedOn, string[] memory _dishchargedOn) {
        require(patients[_addr].certificates.length>0, "patient dosen't have a certificates");

        string[] memory Iname = new string[](patients[_addr].certificates.length);
        string[] memory Pname = new string[](patients[_addr].certificates.length);
        string[] memory Reason = new string[](patients[_addr].certificates.length);
        string[] memory AdmOn = new string[](patients[_addr].certificates.length);
        string[] memory DisOn = new string[](patients[_addr].certificates.length);

        for(uint256 i=0;i<patients[_addr].certificates.length;i++){
            Iname[i]=patients[_addr].certificates[i].iname;
            Pname[i]=patients[_addr].certificates[i].pname;
            Reason[i]=patients[_addr].certificates[i].reason;
            AdmOn[i]=patients[_addr].certificates[i].admittedOn;
            DisOn[i]=patients[_addr].certificates[i].dischargedOn;
        }
        return (Iname,Pname,Reason,AdmOn,DisOn);
    }
}