// Material Dashboard 2 React helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

// Material Dashboard 2 React base styles
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
import colors from "assets/theme-dark/base/colors";

const { transparent } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: md,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
