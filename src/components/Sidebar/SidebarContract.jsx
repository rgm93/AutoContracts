import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import cx from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import sidebarContractStyle from "assets/jss/material-dashboard-pro-react/components/sidebarContractStyle.jsx";

var ps;

class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { className, content } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        <div style={{padding: 10, margin: 10, textAlign: 'center'}}>
          { 
            content == 'participants' ? (
              <div>
              <h4>Participantes</h4>
              <br></br>
              <h6>rgm93@gmail.com</h6>
              <h6>lazaro_garcia_93@hotmail.com</h6>
              <h6>manudeluna@gmail.com</h6>
              <h6>pergendeveloper@gmail.com</h6>
              </div>
            ) : content == 'chat' ? (
              <div>
                <h4>Chat</h4>
                <br></br>
                <h6>Nuevo mensaje</h6>
                <h6>Mensajes guardados</h6>
              </div>
              
            ) : content == 'data' ? (
              <div>
              <h4>Datos</h4>
              <br></br>
              <h6>Nueva búsqueda</h6>
              <h6>Búsquedas recientes</h6>
              <h6>Búsquedas habituales</h6>
              </div>
            ) : null
          }
          
        </div>
        
      </div>
    );
  }
}

class SidebarContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true
    };
  }
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  render() {
    const {
      classes,
      logoText,
      bgColor,
      rtlActive
    } = this.props;
    
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    const logoClasses2 =
      classes.logo2 +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses}>
        {logoText}
      </div>
    );
    var brand2 = (
      <div className={logoClasses2}>
        {logoText}
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden smDown implementation="css">
          <Drawer
            anchor="right"
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              content='participants'
            />
            {brand2}
            <SidebarWrapper
              className={sidebarWrapper}
              content='chat'
            />
            {brand2}
            <SidebarWrapper
              className={sidebarWrapper}
              content='data'
            />
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(sidebarContractStyle)(SidebarContract);
