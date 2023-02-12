/* eslint-disable import/no-useless-path-segments */
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
import Footer from "examples/Footer";
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ethers } from "ethers";
import React, { useState } from "react";

// Billing page components
import Bill from "layouts/certificates/components/Bill";
import { useMaterialUIController, setWalletAddress, setContractFunctions } from "context";
import MDButton from "components/MDButton";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// eslint-disable-next-line camelcase
import Deapp_abi from "../../../layouts/authentication/sign-in/abi.json";

function Cover() {
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

  const addToBlockchain = (event) => {
    contract.addCountry("Saudi Arabia", "0x989150C2F70613b487Fbc14253a2f2B68003019D");
    console.log(event.target.name.value); // for debugging
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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Add Country
                {walletAddress == null ? (
                  <MDButton
                    onClick={connectWalletHandler}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
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
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <input placeholder="Name" type="text" name="name" id="" />
                </MDBox>
                <MDBox mb={2}>
                  <input placeholder="Address" type="text" name="addr" id="" />
                </MDBox>

                <MDBox mt={4} mb={1}>
                  <MDButton onClick={addToBlockchain} variant="gradient" color="info" fullWidth>
                    Add Country
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Cover;
