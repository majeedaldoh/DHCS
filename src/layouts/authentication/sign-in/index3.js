// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import authorsTableData from "layouts/tables/data/authorsTableData";

function Basic() {
  const { columns, rows } = authorsTableData();

  return (
    <BasicLayout image={bgImage}>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
