import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import SCLogo from "assets/img/scapeshift/sc1.jpeg";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle.jsx";
import axios from "axios";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      username: '',
      password: '',
      isReal: false
    };
  }
  /*componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }*/

  handleInput = (type, e) => {
    switch(type) {
      case 'username': this.setState({username: e.target.value}); break;
      case 'password': this.setState({password: e.target.value}); break;
    }
  }

  login = () => {
    const body = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password
    })
    axios.post('http://172.17.102.25:8000/api/v1/users/login/', body, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log(response.data)
      })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <div className={classes.imgCenter}>
                <img
                  src={SCLogo}
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                />
              </div>
              <h2 className={classes.cardTitle}>Acceso a SCAPESHIFT</h2>

              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={6} md={6}>
                    <form className={classes.form}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          onChange: (event) => this.handleInput('username', event),
                          type: "text",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                person
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Nombre de usuario"
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          onChange: (event) => this.handleInput('password', event),
                          type: "password",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Contraseña"
                        }}
                      />
                      <span>
                            ¿No tienes acceso? Regístrate en SCAPESHIFT {" "}
                            <a href="#pablo">aquí</a>.
                          </span>
                      <div className={classes.center}>
                        <Button round color="secondary" onClick={this.login}>
                          Acceder
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(LoginPage);
