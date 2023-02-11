// const contractAddress = "0x0e4840Fe5e87A520eC031C1f15Ac139108B50C89"; //this is the contract address

// const [errorMessage, setErrorMessage] = useState(null);
// const [defaultAccount, setDefaultAccount] = useState(
//   localStorage.getItem("defaultAccount") || null
// );
// const [connButtonText, setConnButtonText] = useState("Connect Wallet");
// //this for ui to

// const [provider, setProvider] = useState(null);
// const [signer, setSigner] = useState(null);
// const [contract, setContract] = useState(null);
// //this for ethers.js

// //this for connecting the metamask

// const connectWalletHandler = () => {
//   if (window.ethereum && window.ethereum.isMetaMask) {
//     window.ethereum
//       .request({ method: "eth_requestAccounts" })
//       .then((result) => {
//         accountChangedHandler(result[0]);
//       })
//       .catch((error) => {
//         setErrorMessage(error.message);
//       });
//   } else {
//     console.log("Need to install MetaMask");
//     setErrorMessage("Please install MetaMask browser extension to interact");
//   }
// };

// const accountChangedHandler = (newAccount) => {
//   setDefaultAccount(newAccount);
//   updateEthers();
//   let sessionExpires = new Date();
//   sessionExpires.setDate(sessionExpires.getDate() + 7);
//   localStorage.setItem("defaultAccount", newAccount);
//   localStorage.setItem("isSessionActive", true);
//   localStorage.setItem("sessionExpires", sessionExpires);
// };

// const chainChangedHandler = () => {
//   // reload the page to avoid any errors with chain change mid use of application
//   window.location.reload();
// };

// // listen for account changes
// window.ethereum.on("accountsChanged", accountChangedHandler);

// window.ethereum.on("chainChanged", chainChangedHandler);

// const updateEthers = () => {
//   let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
//   setProvider(tempProvider);
//   let tempSigner = tempProvider.getSigner();
//   setSigner(tempSigner);
//   let tempContract = new ethers.Contract(contractAddress, Deapp_abi, tempSigner);
//   setContract(tempContract);
// };
// useEffect(() => {
//   let isSessionActive = localStorage.getItem("isSessionActive");
//   let sessionExpires = localStorage.getItem("sessionExpires");
//   let currentDate = new Date();

//   if (isSessionActive === "true" && currentDate < new Date(sessionExpires)) {
//     let storedDefaultAccount = localStorage.getItem("defaultAccount");
//     setDefaultAccount(storedDefaultAccount);
//     updateEthers();
//   } else {
//     connectWalletHandler();
//   }
// }, []);
