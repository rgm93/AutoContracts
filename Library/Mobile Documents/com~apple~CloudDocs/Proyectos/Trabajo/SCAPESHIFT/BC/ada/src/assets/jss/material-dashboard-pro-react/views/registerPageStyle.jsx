import {
  container,
  cardTitle,
  blackColor,
  hexToRgb,
  grayColor,
  primaryColor,
  primaryBoxShadow
} from "assets/jss/material-dashboard-pro-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  cardTitle2: {
    ...cardTitle,
    marginTop: "20px",
    textAlign: "center",
    marginBottom: "30px"
  },
  cardTitle3: {
    ...cardTitle,
    display: "inline-block",
    margin: "5%"
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
    marginTop: "auto"
  },
  center: {
    margin: "40px",
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  form: {
    margin: "30px auto",
    padding: "0 20px",
    position: "relative"
  },
  socialTitle: {
    fontSize: "18px"
  },
  imgCenter: {
    width: "8%",
    margin: "30px auto 20px auto",
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
  },
  selectMenu: {
    "& > div > ul": {
      border: "0",
      padding: "5px 0",
      margin: "0",
      boxShadow: "none",
      minWidth: "100%",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "block",
      fontSize: "14px",
      textAlign: "left",
      listStyle: "none",
      backgroundColor: "#fff",
      backgroundClip: "padding-box"
    },
    "& $selectPaper $selectMenuItemSelectedMultiple": {
      backgroundColor: "inherit"
    }
  },
  select: {
    fontSize: ".75rem",
    fontWeight: "400",
    lineHeight: "1.42857",
    textDecoration: "none",
    textTransform: "uppercase",
    display: "flex",
    width: "250px",
    color: "#3C4858",
    padding: "15px",
    letterSpacing: "0",
    "&:focus": {
      backgroundColor: "transparent"
    },
    "&[aria-owns] + input + svg": {
      transform: "rotate(180deg)"
    },
    "& + input + svg": {
      transition: "all 300ms linear"
    }
  },
  selectFormControl: {
    margin: "10px 1px 10px 0px !important",
    "& > div": {
      "&:before": {
        borderBottomWidth: "1px !important",
        borderBottomColor: "#D2D2D2 !important"
      },
      "&:after": {
        borderBottomColor: primaryColor + "!important"
      }
    }
  },
  selectLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    color: "#3C4858 !important",
    top: "8px"
  },
  selectMenuItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "2",
    whiteSpace: "nowrap",
    color: "#333",
    paddingRight: "30px",
    "&:hover": {
      backgroundColor: primaryColor,
      color: "#FFFFFF",
      ...primaryBoxShadow
    }
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor + "!important",
    color: "#FFFFFF"
  },
  selectMenuItemSelectedMultiple: {
    "&:hover": {
      backgroundColor: primaryColor + "!important",
      color: "#FFFFFF",
      ...primaryBoxShadow,
      "&:after": {
        color: "#FFFFFF"
      }
    },
    "&:after": {
      top: "16px",
      right: "12px",
      width: "12px",
      height: "5px",
      borderLeft: "2px solid currentColor",
      transform: "rotate(-45deg)",
      opacity: "1",
      color: "#3c4858",
      position: "absolute",
      content: "''",
      borderBottom: "2px solid currentColor",
      transition: "opacity 90ms cubic-bezier(0,0,.2,.1)"
    }
  },
  selectCenter: {
    display: "flex",
    justifyContent: "center",
    margin: "5%"
  },
  buttonCenter: {
    margin: "10px"
  }
};

export default registerPageStyle;
