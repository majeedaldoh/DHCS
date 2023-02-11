// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import QrReader from "react-qr-scanner";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/logo-01.png";
import MDBox from "components/MDBox";

function Cover() {
  // const ScanComponent = () => {
  //   const navigate = useNavigate();
  //   const [data, setData] = useState("");
  //     const handleScan = async (scanData) => {
  //       console.log(`loaded data data`, scanData);
  //       if (scanData && scanData !== "") {
  //         console.log(`loaded >>>`, scanData);
  //         setData(scanData);
  //       }
  //     };
  //     const handleError = (err) => {
  //       console.error(err);
  //     };
  return (
    <CoverLayout image={bgImage}>
      <MDBox
        variant="#59D2BE"
        bgColor="#59D2BE"
        borderRadius="lg"
        coloredShadow="info"
        p={2}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Scan The Qr Code
        </MDTypography>
        <Card>
          <QrReader
            delay={10000}
            // onError={handleError}
            // onScan={handleScan}
            // style={{ width: "400px" }}
          />
        </Card>
      </MDBox>
    </CoverLayout>
  );
}

export default Cover;
