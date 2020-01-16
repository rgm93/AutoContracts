import {
  container,
  cardTitle,
  blackColor,
  hexToRgb,
  grayColor
} from "assets/jss/material-dashboard-pro-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3"
    // paddingTop: "23vh"
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(" +
      hexToRgb(blackColor) +
      ", 0.14), 0 6px 30px 5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    marginBottom: "auto",
    padding: "40px 0px",
    marginTop: "auto"
  },
  center: {
    margin: "50px",
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  form: {
    margin: "20px",
    padding: "0 20px",
    position: "relative"
  },
  socialTitle: {
    fontSize: "18px"
  },
  imgCenter: {
    width: "8%",
    margin: "auto",
    padding: "inherit"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  customFormControlClasses: {
    margin: "10px"
  },
  checkboxLabelControl: {
    margin: "0"
  },
  checkboxLabel: {
    marginLeft: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)"
  }
};

export default registerPageStyle;
