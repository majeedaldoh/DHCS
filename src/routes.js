/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Agencies from "layouts/agencies";
import CreateAgency from "layouts/authentication/CreateAgency";
import CreateCertificates from "layouts/authentication/CreateCertificates";
import CreateCountry from "layouts/authentication/CreateCountry";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Certificates from "layouts/certificates";

import Dashboard from "layouts/dashboard";
import Issuers from "layouts/issuers";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import RTL from "layouts/rtl";
import Tables from "layouts/tables";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    isAllowed: 1,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Manage Countries",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    isAllowed: 1,
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Create Country",
    key: "createCountry",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/create-country",
    isAllowed: 1,
    component: <CreateCountry />,
  },
  {
    type: "collapse",
    name: "Manage Agencies",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Agencies",
    isAllowed: 1,
    component: <Agencies />,
  },
  {
    type: "collapse",
    name: "Create Agency",
    key: "createCountry",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/create-agency",
    isAllowed: 1,
    component: <CreateAgency />,
  },
  {
    type: "collapse",
    name: "Manage Issuers",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Issuers",
    isAllowed: 1,
    component: <Issuers />,
  },
  {
    type: "collapse",
    name: "Create Issuer",
    key: "createCountry",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/create-Issuer",
    isAllowed: 1,
    component: <CreateAgency />,
  },
  {
    type: "collapse",
    name: "Manage Certificates",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Issuers",
    isAllowed: 1,
    component: <Certificates />,
  },
  {
    type: "collapse",
    name: "Create Certificate",
    key: "createCountry",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/create-Issuer",
    isAllowed: 1,
    component: <CreateCertificates />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    isAllowed: 1,
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    isAllowed: 1,
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    isAllowed: 1,
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    isAllowed: 1,
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Scan",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
