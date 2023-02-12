/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { ethers } from "ethers";
import React, { useState } from "react";

// Images
// eslint-disable-next-line import/no-unresolved
import bgImage from "assets/images/sign-in-bg.svg";
// eslint-disable-next-line camelcase
import { useMaterialUIController, setWalletAddress, setContractFunctions } from "context";
// eslint-disable-next-line camelcase
import Deapp_abi from "./abi.json";

function Basic() {
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
    const val = await contract.getCountryByAddress("0x5b29B50D5DcfB6499aCe99f43B20a166aba25640");
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
  // const chainChangedHandler = () => {
  //   // reload the page to avoid any errors with chain change mid use of application
  //   window.location.reload();
  // };

  // // listen for account changes
  // // window.ethereum.on("accountsChanged", accountChangedHandler);

  // // window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <BasicLayout image={bgImage}>
      {walletAddress == null ? (
        <Card>
          <MDBox
            variant="#59D2BE"
            bgColor="#59D2BE"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in Using MetaMask
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mt={4} mb={1}>
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
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      ) : (
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              My Certificates
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mt={4} mb={1}>
                <div>
                  <h3> StudentInfo : {StudentInfo}</h3>
                  <MDButton onClick={clearStorage} variant="gradient" color="info" fullWidth>
                    <h3> Sign out </h3>
                  </MDButton>
                  <MDButton onClick={getAllStudentInfo} variant="gradient" color="info" fullWidth>
                    <h3> getAll </h3>
                  </MDButton>
                </div>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      )}
    </BasicLayout>
  );
}

export default Basic;
