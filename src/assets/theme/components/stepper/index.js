// Material Dashboard 2 React base styles
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";
import colors from "assets/theme/base/colors";

// Material Dashboard 2 React helper functions
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

const stepper = {
  styleOverrides: {
    root: {
      background: linearGradient(gradients.info.main, gradients.info.state),
      padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
      borderRadius: borderRadius.lg,
      boxShadow: colored.info,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main,
      },
    },
  },
};

export default stepper;
