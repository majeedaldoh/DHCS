// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract DHCs{

    address public superAdmin;
    address public country;
    address public agency;
    uint256 public index;
    uint256 public uindex = 0;


    struct Country {
        string name;
        Agency[] agencies;
        address addr;
    }
    Country[] Countries;
    struct Agency {
        string name;
        Issuer[] issuers;
        address addr;
    }
    struct Issuer {
        uint256 id;
        string iname;
        string iaddress;
        string icontact;
        address addr;
        bool isApproved;
        Certificate[] certificates;
    }
    Issuer[] Issuers;
    struct Certificate {
        string iname;
        string pname;
        string reason;
        string admittedOn;
        string dischargedOn;
        string ipfs;
    }
    
    struct Patient{
        Certificate[] certificates;
        address addr;
    }
    
    mapping(address=>Country[]) countries;
    mapping(address=>bool) isCountry;
    mapping(address=>Agency[]) agencies;
    mapping(address=>bool) isAgency;
    mapping(address=>Issuer[]) issuers;
    mapping(address=>bool) isIssuer;
    mapping(address=>Patient[]) patients;
    mapping(address=>bool) isPatient;

    address[] countryList;
    address[] issuerList;

    event SuperAdminChanged(address indexed _from,address indexed _to);
    event countryAdded(address indexed country_address);
    event countryRemoved(address indexed country_address);
    event AgencyAdded(address indexed Agency_address);
    event AgencyRemoved(address indexed Agency_address);
    event issuerAdded(address indexed issuer_address);

    constructor()public{
        superAdmin=msg.sender;
    }

    modifier onlySuperAdmin(){
        require(superAdmin == msg.sender, "Only the superAdmin has permission to this action");
        _;
    }
    modifier onlyCountry(){
        require(isCountry[msg.sender] == true, "Only Country has permission to this action");
        _;
    }
    modifier onlyAgency(){
        require(isAgency[msg.sender] == true, "Only ageny has permission to this action ");
        _;
    }
    modifier onlyIssuer(){
        require(isIssuer[msg.sender] == true, "Only Issuers can Issue Records");
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
        Country memory newCountry;

        newCountry.name = _name;
        newCountry.addr = _address;

        isCountry[_address] = true;
        countryList.push(_address);
        countries[_address].push(newCountry);
        emit countryAdded(_address);
        return true;
    }

    function removeCountry(address _address) public onlySuperAdmin returns(bool success){
        require(isCountry[_address],"user is not yet a country");
        isCountry[_address] = false;
        emit countryRemoved(_address);
        return true;
    }
    function getAllCountries()public view onlySuperAdmin returns(Country[] memory _tmp){
        return Countries;
    }

    function addAgency(string memory _name, address _address) public onlyCountry returns(bool success){
        require(!isAgency[_address],"user already Agency");
        Agency memory newAgency;
        isAgency[_address] = true;
        newAgency.name = _name;
        newAgency.addr = _address;
        emit AgencyAdded(_address);
        return true;
    }
    function removeAgency(address _address) public onlyCountry returns(bool success){
        require(isAgency[_address],"user is not yet an Agency");
        isAgency[_address] = false;
        emit AgencyRemoved(_address);
        return true;
    }

    function addIssuer(string memory _iname,address _addr, string memory _iaddress, string memory _icontact) public onlyAgency {
        require(!isIssuer[_addr],"Already an Issuer!");
        Issuer memory newIssuer;
        issuerList.push(_addr);
        index = index + 1;
        isIssuer[_addr]=true;

        newIssuer.id = index;
        newIssuer.iname = _iname;
        newIssuer.iaddress = _iaddress;
        newIssuer.icontact = _icontact;
        newIssuer.addr = _addr;
        newIssuer.isApproved = true;

        issuers[_addr].push(newIssuer);
    }

    function getIssuerByAddress(address _addr) public view returns(uint256 _id,string memory iname,string memory iaddress,string memory icontact,address addr,bool isApproved) {
        //require(issuers[_addr].isApproved,"issuer is not approved or doesn't exist");
        Issuer memory tmp = issuers[_addr];
        return(tmp.id, tmp.iname, tmp.iaddress, tmp.icontact, tmp.addr, tmp.isApproved);
    }
    function getAllIssuers()public view onlyAgency returns(Issuer[] memory){
        require(issuerList.length>0, 'there is no issuers');
        return Issuers;
    }

    function IssueCertificates(address _addr, string memory _iname, string memory _pname, string memory _reason, string memory _admittedOn, string memory _dischargedOn,string memory _ipfs) public onlyIssuer{
        patients[_addr].certificates.push(Certificate(_iname,_pname, _reason, _admittedOn, _dischargedOn, _ipfs));
        issuers[msg.sender].certificates.push(Certificate(_iname,_pname, _reason, _admittedOn, _dischargedOn, _ipfs));
    }
    function getIssuerCertificates(address _addr) public view returns(string[] memory _iname, string[] memory _pname, string[] memory _reason, string[] memory _admittedOn, string[] memory _dishchargedOn, string[] memory ipfs){
        require(issuers[_addr].certificates.length>0, "issuer dosen't have a certificates");

        string[] memory Iname = new string[](issuers[_addr].certificates.length);
        string[] memory Pname = new string[](issuers[_addr].certificates.length);
        string[] memory Reason = new string[](issuers[_addr].certificates.length);
        string[] memory AdmOn = new string[](issuers[_addr].certificates.length);
        string[] memory DisOn = new string[](issuers[_addr].certificates.length);
        string[] memory IPFS = new string[](issuers[_addr].certificates.length);

        for(uint256 i=0;i<issuers[_addr].certificates.length;i++){
            Iname[i]=issuers[_addr].certificates[i].iname;
            Pname[i]=issuers[_addr].certificates[i].pname;
            Reason[i]=issuers[_addr].certificates[i].reason;
            AdmOn[i]=issuers[_addr].certificates[i].admittedOn;
            DisOn[i]=issuers[_addr].certificates[i].dischargedOn;
            IPFS[i]=issuers[_addr].certificates[i].ipfs;
        }
        return (Iname,Pname,Reason,AdmOn,DisOn,IPFS);
    }
    function getPatienCertificates(address _addr) public view onlyAgency returns(string[] memory _iname, string[] memory _pname, string[] memory _reason, string[] memory _admittedOn, string[] memory _dishchargedOn, string[] memory ipfs) {
        require(patients[_addr].certificates.length>0, "patient dosen't have a certificates");

        string[] memory Iname = new string[](patients[_addr].certificates.length);
        string[] memory Pname = new string[](patients[_addr].certificates.length);
        string[] memory Reason = new string[](patients[_addr].certificates.length);
        string[] memory AdmOn = new string[](patients[_addr].certificates.length);
        string[] memory DisOn = new string[](patients[_addr].certificates.length);
        string[] memory IPFS = new string[](patients[_addr].certificates.length);

        for(uint256 i=0;i<patients[_addr].certificates.length;i++){
            Iname[i]=patients[_addr].certificates[i].iname;
            Pname[i]=patients[_addr].certificates[i].pname;
            Reason[i]=patients[_addr].certificates[i].reason;
            AdmOn[i]=patients[_addr].certificates[i].admittedOn;
            DisOn[i]=patients[_addr].certificates[i].dischargedOn;
            IPFS[i]=patients[_addr].certificates[i].ipfs;
        }
        return (Iname,Pname,Reason,AdmOn,DisOn,IPFS);
    }

}