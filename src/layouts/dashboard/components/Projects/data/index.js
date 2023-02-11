/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";

export default function data() {
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Countries", accessor: "companies", width: "45%", align: "left" },
      { Header: "Agencies", accessor: "members", width: "10%", align: "left" },
      { Header: "Issuers", accessor: "budget", align: "center" },
      { Header: "Certificates", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        companies: <Company image={logoXD} name="Material UI XD Version" />,
        members: (
          <MDBox display="flex" py={1}>
            500
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        completion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
      },
    ],
  };
}
