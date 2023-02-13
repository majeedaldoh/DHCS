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
  const contractAddress = "0x8DdA61cD8E13D54a83F06DeECeCc923F167c5442";

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
    const val = await contract.getAllCertificates();

    console.log(val);
    alert(val);
    getStudentInfo(val.hash);
  };

  const addToBlockchain = async (event) => {
    const inputVal = document.getElementsByClassName("inputClass")[0].value;
    const inputVal2 = document.getElementsByClassName("inputClass2")[0].value;
    const inputVal3 = document.getElementsByClassName("inputClass3")[0].value;
    const inputVal4 = document.getElementsByClassName("inputClass4")[0].value;
    const inputVal5 = document.getElementsByClassName("inputClass5")[0].value;
    const inputVal6 = document.getElementsByClassName("inputClass6")[0].value;
    contract.IssueCertificate(inputVal, inputVal2, inputVal3, inputVal4, inputVal5, inputVal6);
    const val = await contract.getPatienCertificates(inputVal);
    alert(val);
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
                Add Certificate
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
                  <input
                    placeholder="Address"
                    type="text"
                    name="name"
                    id="name"
                    className="inputClass"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <input
                    placeholder="Pname"
                    type="text"
                    name="addr"
                    id="addr"
                    className="inputClass2"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <input
                    placeholder="Iname"
                    type="text"
                    name="addr"
                    id="addr"
                    className="inputClass3"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <input
                    placeholder="Reason"
                    type="text"
                    name="addr"
                    id="addr"
                    className="inputClass4"
                  />
                </MDBox>

                <MDBox mb={2}>
                  <input
                    placeholder="addom"
                    type="date"
                    name="addr"
                    id="addr"
                    className="inputClass5"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <input
                    placeholder="disson"
                    type="date"
                    name="addr"
                    id="addr"
                    className="inputClass6"
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton onClick={addToBlockchain} variant="gradient" color="info" fullWidth>
                    Add Certificate
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
