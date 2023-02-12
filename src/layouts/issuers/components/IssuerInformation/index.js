/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ethers } from "ethers";
import React, { useState } from "react";

// Billing page components
import Bill from "layouts/certificates/components/Bill";
import { useMaterialUIController, setWalletAddress, setContractFunctions } from "context";
import MDButton from "components/MDButton";
// eslint-disable-next-line camelcase
import Deapp_abi from "../../../authentication/sign-in/abi.json";

function BillingInformation() {
  const [controller, dispatch] = useMaterialUIController();
  const { walletAddress } = controller;
  const contractAddress = "0xe6440b7046fC27992BD9a1b5e3Db065fc8223027";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      // eslint-disable-next-line no-alert, no-console
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };
  const clearStorage = () => {
    // console.log(contract.functions);
    localStorage.clear();
    window.location.reload();
  };
  const [StudentInfo, getStudentInfo] = useState(null);

  const getAllStudentInfo = async () => {
    const val = await contract.getPatienCertificates("0xff062CaeC5db00963A5f00F67f802644be7b886B");
    console.log(val);
    alert(val);
    getStudentInfo(val.hash);
  };

  const log = () => {
    console.log(window.ethereum);
    console.log(contract.functions);
  };
  const updateEthers = () => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    const tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    const tempContract = new ethers.Contract(contractAddress, Deapp_abi, tempSigner);
    setContract(tempContract);
  };
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    const sessionExpires = new Date();
    sessionExpires.setDate(sessionExpires.getDate() + 7);
    localStorage.setItem("defaultAccount", newAccount);
    localStorage.setItem("isSessionActive", true);
    localStorage.setItem("sessionExpires", sessionExpires);
    console.log("saad here");
    updateEthers();
    setWalletAddress(dispatch, newAccount);
    setContractFunctions(dispatch, contract.functions);
  };
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Certificates
          {walletAddress == null ? (
            <MDButton onClick={connectWalletHandler} variant="gradient" color="info" fullWidth>
              {connButtonText}
              {errorMessage}
              <h3> Address: {defaultAccount} </h3>
            </MDButton>
          ) : (
            <div>
              <h3> Address: {walletAddress} </h3>
              <MDButton onClick={clearStorage} variant="gradient" color="info" fullWidth>
                <h3> Sign out </h3>
              </MDButton>
              <MDButton onClick={getAllStudentInfo} variant="gradient" color="info" fullWidth>
                <h3> getAll </h3>
              </MDButton>
            </div>
          )}
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
