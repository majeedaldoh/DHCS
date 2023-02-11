// @mui material components
import Card from "@mui/material/Card";
<<<<<<< HEAD
import { useState } from "react";
=======
import Grid from "@mui/material/Grid";
>>>>>>> main

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/dashboard/components/Projects/data";

function Tables() {
  const { columns, rows } = authorsTableData();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Add Country</MenuItem>
    </Menu>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDBox>
                  <MDTypography variant="h6" gutterBottom>
                    Countries
                  </MDTypography>
                  <MDBox display="flex" alignItems="center" lineHeight={0}>
                    <Icon
                      sx={{
                        fontWeight: "bold",
                        color: ({ palette: { info } }) => info.main,
                        mt: -0.5,
                      }}
                    >
                      done
                    </Icon>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;<strong>30 Added</strong> this month
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox color="text" px={2}>
                  <Icon
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                    fontSize="small"
                    onClick={openMenu}
                  >
                    more_vert
                  </Icon>
                </MDBox>
                {renderMenu}
              </MDBox>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                  entriesPerPage={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
