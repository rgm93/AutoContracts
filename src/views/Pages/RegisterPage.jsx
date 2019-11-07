import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import SCLogo from "assets/img/scapeshift/sc1.jpeg";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import Switch from "@material-ui/core/Switch";

import Camera from 'react-html5-camera-photo';
import ReactCodeInput from 'react-verification-code-input';

import axios from 'axios';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      username: '',
      password: '',
      doc_number: '',
      phone: '',
      address: '',
      company: '',
      job: '',
      is_signatory: false,
      camera: false,
      dni: false,
      waitEmail: false,
      verifyEmail: false,
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleInput = (type, e) => {
    switch(type) {
      case 'name': this.setState({name: e.target.value}); break;
      case 'surname': this.setState({surname: e.target.value}); break;
      case 'username': this.setState({username: e.target.value}); break;
      case 'password': this.setState({password: e.target.value}); break;
      case 'phone': this.setState({phone: e.target.value}); break;
      case 'address': this.setState({address: e.target.value}); break;
      case 'company': this.setState({company: e.target.value}); break;
      case 'job': this.setState({job: e.target.value}); break;
      case 'doc_number': this.setState({doc_number: e.target.value}); break;
      case 'is_signatory': this.setState({is_signatory: e.target.value}); break;
    }
  }

  testAPI = () => {
    const body = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password,
      "name": this.state.name,
      "surname": this.state.surname,
      "phone": this.state.phone,
      "address": this.state.address,
      "company": this.state.company,
      "job": this.state.job,
      "is_signatory": true,
      "doc_number": this.state.doc_number
    })
    axios.post('http://172.17.102.25:8000/api/v1/users/create/', body, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log(response.data)
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.checked });
  };

  prevRegister = () => {this.setState({camera: false})}
  nextDni = () => { this.setState({camera: true})}

  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log('takePhoto');
  }

  signin = () => { 
    console.log('nameLast', this.state)
  }

  render() {
    const { classes } = this.props;
    const { camera } = this.state
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
              <h2 className={classes.cardTitle}>Registro en SCAPESHIFT</h2>

              { 
                !camera ? (
                  <div>
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
                              onChange: (event) => this.handleInput('name', event),
                              type: 'text',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Nombre"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('surname', event),
                              type: 'text',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Apellidos"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('username', event),
                              type: 'email',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Email className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Email"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('password', event),
                              type: 'password',
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
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('doc_number', event),
                              type: 'text',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    assignment_ind
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Documento de identidad"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('phone', event),
                              type: 'number',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    phone
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Teléfono"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('address', event),
                              type: 'text',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    house
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Dirección"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('company', event),
                              type: 'text',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    business
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Empresa"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              onChange: (event) => this.handleInput('job', event),
                              type: 'text',
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.inputAdornmentIcon}>
                                    business_center
                                  </Icon>
                                </InputAdornment>
                              ),
                              placeholder: "Cargo"
                            }}
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={this.state.is_signatory}
                                onChange={this.handleChange("is_signatory")}
                                value="is_signatory"
                                classes={{
                                  switchBase: classes.switchBase,
                                  checked: classes.switchChecked,
                                  icon: classes.switchIcon,
                                  iconChecked: classes.switchIconChecked,
                                  bar: classes.switchBar
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="No firmante"
                          />
                    
                          <FormControlLabel
                            classes={{
                              root: classes.checkboxLabelControl,
                              label: classes.checkboxLabel
                            }}
                            control={
                              <Checkbox
                                tabIndex={-1}
                                onClick={() => this.handleToggle(1)}
                                checkedIcon={
                                  <Check className={classes.checkedIcon} />
                                }
                                icon={<Check className={classes.uncheckedIcon} />}
                                classes={{
                                  checked: classes.checked,
                                  root: classes.checkRoot
                                }}
                              />
                            }
                            label={
                              <span>
                                He leído los{" "}
                                <a href="#pablo">términos y condiciones</a>.
                              </span>
                            }
                          />
                          <div className={classes.center}>
                            <Button round color="primary" onClick={this.testAPI}>
                              Registrarse
                            </Button>
                          </div>
                        </form>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  </div>
                ) : camera ? (
                  <div>
                    <Camera
                      onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                    />
                  </div>
                ) : this.state.waitEmail ? (
                  <div>
                    <ReactCodeInput />
                  </div>
                ) : (
                  <div>
                    <p>¡COMPLETADO!</p>
                  </div>
                )
              }
              
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
