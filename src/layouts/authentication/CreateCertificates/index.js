// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
import Footer from "examples/Footer";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Cover() {
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
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput type="text" label="Name" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="email" label="Email" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" variant="standard" fullWidth />
                </MDBox>

                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth>
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
