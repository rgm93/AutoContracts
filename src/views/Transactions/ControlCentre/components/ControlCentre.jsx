import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import SidebarContract from "components/Sidebar/SidebarContract.jsx";
var ps;

class ControlCentre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        {/*<SidebarContract color="white" bgColor="black" />*/}
      </div>
    );
  }
}

ControlCentre.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ControlCentre);
