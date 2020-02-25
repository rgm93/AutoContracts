import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
// import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import SCLogo from "assets/img/scapeshift/sc1.jpeg";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
//import axios from "axios";
import { NavLink, Router, Route, Switch, Redirect } from "react-router-dom";

import AuthProvider from 'providers/AuthProvider'

import {
  verifyEmail,
  verifyLength,
  verifyMnemonicWords,
  formLogIn,
  isAccountExists,
  isAccountActivated,
  checkMnemonicPhrase
} from "./Register/functions/functionsRegister.js";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signForm: {
        email: '',
        password: '',
        masterPassword: '',
      },
      controlForm: {
        emailForm: 'error',
        passwordForm: 'error',
        masterPasswordForm: 'error'
      },
      buttonsSteps: {
        buttonForm1: false,
        buttonForm2: false
      },
      stepForm: 0
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
    let validateForm = ''
    switch(type) {
      case 'email': 
        verifyEmail(e.target.value) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm: {
            ...this.state.signForm, 
            email: e.target.value
          },
          controlForm: {
            ...this.state.controlForm,
            emailForm: validateForm
          }
        }); 
        break;
      case 'password': 
        verifyLength(e.target.value, 6) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm: {
            ...this.state.signForm, 
            password: e.target.value
          },
          controlForm: {
            ...this.state.controlForm,
            passwordForm: validateForm
          }
        }); 
        break;
      case 'masterPassword': 
        verifyMnemonicWords(e.target.value) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm: {
            ...this.state.signForm, 
            masterPassword: e.target.value
          },
          controlForm: {
            ...this.state.controlForm,
            masterPasswordForm: validateForm
          }
        }); 
        break;
      default: break;
    }
    this.handleLoginForms(this.state.stepForm)
  }

  handleLoginForms = (index) => {
    let controls = [];
    switch(index) {
      case 0: controls = [this.state.controlForm.emailForm, this.state.controlForm.passwordForm]; break;
      case 1: controls = [this.state.controlForm.masterPasswordForm]; break;
      default: break;
    }
    let result = controls.find(value => value === 'error')
    let value = (result !== 'error') ? true : false
    this.handleButtonSteps(index, value)
  }  

  handleButtonSteps = (index, value) => {
    switch(index) {
      case 0: this.setState({ buttonsSteps: {...this.state.buttonsSteps, buttonForm1: value } }); break;
      case 1: this.setState({ buttonsSteps: {...this.state.buttonsSteps, buttonForm2: value } }); break;
      default: break;
    }
  }

  login = async () => {
    let email = this.state.signForm.email
    let password = this.state.signForm.password
    let existsAccount = await isAccountExists(email)
    if (existsAccount) {
      localStorage.setItem('existsAccount', existsAccount)
      let data = await formLogIn(email, password)
      if (data != 'Wrong Credentials') {
        localStorage.setItem('authtoken', data)
        let activated = await isAccountActivated()
        if (activated) { 
          localStorage.setItem('accountActivate', activated)
          this.nextStep() 
        }
        else alert("La cuenta no está activada")
      }
      else alert("El email y/o la contraseña son incorrectas")
    }
    else alert("El email no existe en la plataforma.")
  }

  checkMasterPassword = async () => {
    let check = await checkMnemonicPhrase(this.state.signForm.masterPassword, localStorage.getItem('authtoken'))
    console.log('ck', check)
    if (check) {
      localStorage.setItem('master', check)
      AuthProvider.authenticate()
      this.props.history.push('/admin/controlCentre')
    } else {
      alert('La clave maestra no existe')
    }
  }

  nextStep = () => this.setState({stepForm: this.state.stepForm + 1})
  
  render() {
    const { classes } = this.props
    const { stepForm } = this.state
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
                    {
                      stepForm === 0 ? (
                        <form className={classes.form}>
                          <CustomInput
                            success={this.state.controlForm.emailForm === "success"}
                            error={this.state.controlForm.emailForm === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            id="email"
                            inputProps={{
                              onChange: (event) => this.handleInput('email', event),
                              type: "text",
                              value: this.state.signForm.username,
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
                              placeholder: "Email"
                            }}
                          />
                          <CustomInput
                            success={this.state.controlForm.passwordForm === "success"}
                            error={this.state.controlForm.passwordForm === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            id="password"
                            inputProps={{
                              onChange: (event) => this.handleInput('password', event),
                              type: "password",
                              value: this.state.signForm.password,
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
                          <div className={classes.center}>
                          <span >
                            ¿No tienes acceso? Regístrate en SCAPESHIFT {" "}
                            <a href="/auth/signin">aquí</a>.
                          </span>
                          </div>
                          <div className={classes.center}>
                            <Button round color="secondary" disabled={!this.state.buttonsSteps.buttonForm1} onClick={this.login}>
                              Acceder
                            </Button>
                          </div>
                        </form>
                      ) : stepForm === 1 ? (
                        <form className={classes.form}>
                          <CustomInput
                            success={this.state.controlForm.masterPasswordForm === "success"}
                            error={this.state.controlForm.masterPasswordForm === "error"}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            id="masterPassword"
                            inputProps={{
                              onChange: (event) => this.handleInput('masterPassword', event),
                              type: "text",
                              value: this.state.signForm.masterPassword,
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    lock
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Contraseña Maestra"
                            }}
                          />
                          <div className={classes.center}>
                          {/*<NavLink to={"/admin/newTransaction"}>*/}
                            <Button round color="secondary" disabled={!this.state.buttonsSteps.buttonForm2} onClick={this.checkMasterPassword}>
                              Verificar
                            </Button>
                          {/*</NavLink>*/}
                          </div>
                        </form>
                      ) : null
                    }
                    
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

export default withStyles(loginPageStyle)(LoginPage);
