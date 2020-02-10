import React, { Component } from "react";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SCLogo from "assets/img/scapeshift/sc1.jpeg";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import Switch from "@material-ui/core/Switch";
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from '@material-ui/core/TextField';
import ReactCodeInput from 'react-verification-code-input';

import Camera, { /*FACING_MODES, */ IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import axios from 'axios';
// import { Ring } from 'react-awesome-spinners'
import Success from './components/Success';
import { PushSpinner } from "react-spinners-kit";
import { NavLink } from "react-router-dom";

import {
  verifyEmail,
  verifyNumber,
  verifyLength,
  verifyDocNumber,
  getEntities,
  verifyCodeChange,
  formSignIn,
  generateValidationCode,
  sendDocumentPhoto,
  scannnerFaceDocument,
  scannerBackDocument
} from "./functions/functionsRegister.js";

import { setMnemonicPhrase } from "../../Transactions/Contracts/functions/functionsContract"

const styleVerifyCode = {
  width: '350px',
  margin: '50px auto'
};

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signForm: {
        name: '',
        surname: '',
        email: '',
        password: ''
      },
      signForm2: {
        phone: '',
        address: '',
        company: '',
        job: ''
      },
      signForm3: {
        type_doc: 'NIF',
        doc_number: '',
        is_signatory: false,
        checked: [],
      },
      controlForm: {
        nameForm: 'error',
        surnameForm: 'error',
        emailForm: 'error',
        passwordForm: 'error'
      },
      controlForm2: {
        phoneForm: 'error',
        addressForm: 'error',
        companyForm: 'error',
        jobForm: 'error'
      },
      controlForm3: {
        doc_numberForm: 'error',
        check_terms: 'error'
      },
      buttonsSteps: {
        buttonForm1: false,
        buttonForm2: false,
        buttonForm3: false
      },
      docIdCounter: 0,
      camera: false,
      dni: false,
      waitEmail: false,
      verifyEmail: false,
      docImages: [],
      checkingScanner: false,
      checkedScanner: false,
      checkingEmail: false,
      idScannedModify: '',
      entities: [],
      stepForm: 0
    };
    this.inputVerifyCode = React.createRef();
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.setState({entities: getEntities()})
  }

  handleToggle(value) {
    const { checked } = this.state.signForm3;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...this.state.signForm3.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log('newchecked', newChecked[0])
    this.setState({
      signForm3: {
        ...this.state.signForm3,
        checked: newChecked
      },
      controlForm3: {
        ...this.state.controlForm3,
        check_terms: newChecked[0] == undefined ? 'success' : 'error'
      }
    });
    this.handleSignForms(this.state.stepForm)
  }

  handleSelector = e => {
    this.setState({
      signForm3: {
        ...this.state.signForm3,
        type_doc: e.target.value
      },
      controlForm3: {
        ...this.state.controlForm3,
        doc_numberForm: verifyDocNumber(this.state.signForm3.doc_number, e.target.value) ? 'success' : 'error'
      }
    })
  }

  handleInput = (type, e) => {
    let validateForm = ''
    switch(type) {
      case 'name': 
        verifyLength(e.target.value, 3) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm: {
            ...this.state.signForm,
            name: e.target.value
          },
          controlForm: {
            ...this.state.controlForm,
            nameForm: validateForm
          }
        })
        break;
      case 'surname': 
        verifyLength(e.target.value, 3) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm: {
            ...this.state.signForm,
            surname: e.target.value
          },
          controlForm: {
            ...this.state.controlForm,
            surnameForm: validateForm
          }
        })
        break;
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
        })
        break;
      case 'password': 
        verifyLength(e.target.value, 8) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm: {
            ...this.state.signForm,
            password: e.target.value
          },
          controlForm: {
            ...this.state.controlForm,
            passwordForm: validateForm
          }
        })
        break;
      case 'phone': 
        verifyNumber(e.target.value) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm2: {
            ...this.state.signForm2,
            phone: e.target.value
          },
          controlForm2: {
            ...this.state.controlForm2,
            phoneForm: validateForm
          }
        })
        break;
      case 'address': 
        verifyLength(e.target.value, 5) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm2: {
            ...this.state.signForm2,
            address: e.target.value
          },
          controlForm2: {
            ...this.state.controlForm2,
            addressForm: validateForm
          }
        })
        break;
      case 'company': 
        verifyLength(e.target.value, 5) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm2: {
            ...this.state.signForm2,
            company: e.target.value
          },
          controlForm2: {
            ...this.state.controlForm2,
            companyForm: validateForm
          }
        })
        break;
      case 'job':
        verifyLength(e.target.value, 5) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm2: {
            ...this.state.signForm2,
            job: e.target.value
          },
          controlForm2: {
            ...this.state.controlForm2,
            jobForm: validateForm
          }
        })
        break;
      case 'doc_number': 
        verifyDocNumber(e.target.value, this.state.signForm3.type_doc) ? validateForm = 'sucess' : validateForm = 'error'
        this.setState({
          signForm3: {
            ...this.state.signForm3,
            doc_number: e.target.value
          },
          controlForm3: {
            ...this.state.controlForm3,
            doc_numberForm: validateForm
          }
        })
        break;
    }
    console.log('states', this.state)
    this.handleSignForms(this.state.stepForm)
  }

  onTakePhoto = (dataUri) => {
    /*console.log('takePhoto', dataUri);
    this.setState({checkingScanner: true})
    if(this.state.docIdCounter < 2) {
      this.setState({docImages: [...this.state.docImages, dataUri]})
    }
    const body = JSON.stringify({
      "doc_frontal": dataUri,
      "doc_backside": dataUri
    });
    setTimeout(() => {
      this.setState({checkingScanner: false, docIdCounter: this.state.docIdCounter + 1})
      if(this.state.docIdCounter == 2 ) {
        this.setState({checkedScanner: true})
      }
    }, 3000);*/

  
    this.setState({checkingScanner: true})
    if(this.state.docIdCounter < 2) {
      //this.setState({docImages: [...this.state.docImages, dataUri]})
      if(this.state.docIdCounter == 0) {
          let data = sendDocumentPhoto(dataUri)
          if (data !== null) { 
          setTimeout(() => {
            this.setState({idScannedModify: data.id})
            let scanned = scannnerFaceDocument(data.id)
            scanned != null ? this.setState({checkingScanner: false, docIdCounter: this.state.docIdCounter + 1}) : console.log('errorDOC - estado', scanned.status)
          }, 5000)
          }

          //if(this.state.docIdCounter < 2) {this.setState({checkedScanner: true})}
        
      } else if (this.state.docIdCounter == 1) {
        let scannedBack = scannerBackDocument(this.state.idScannedModify, dataUri)
        if (scannedBack !== null) { this.setState({checkedScanner: true, docIdCounter: this.state.docIdCounter + 1}) }
      } 
    }
  }

  onTakePhotoAnimationDone = (dataUri) => console.log('takePhoto');
  onCameraError = (error) => console.error('onCameraError', error);
  onCameraStart = (stream) => console.log('onCameraStart');
  onCameraStop = () => console.log('onCameraStop');

  getDoubleFactorCode = () => this.state.checkedScanner === true ? (generateValidationCode() !== null ? this.setState({dni: true, camera: false}) : '') : false
  //signIn = () => this.setState({camera: formSignIn(this.state.signForm)})

  handleSignForms = (index) => {
    let controls = [];
    switch(index) {
      case 0: controls = [this.state.controlForm.nameForm, this.state.controlForm.surnameForm, this.state.controlForm.emailForm, this.state.controlForm.passwordForm]; break;
      case 1: controls = [this.state.controlForm2.phoneForm, this.state.controlForm2.addressForm, this.state.controlForm2.companyForm, this.state.controlForm2.jobForm]; break;
      case 2: controls = [this.state.controlForm3.doc_numberForm, this.state.controlForm3.check_terms]; break;
    }
    console.log('controls', controls)
    let result = controls.find(value => value == 'error')
    let value = (result !== 'error') ? true : false
    this.handleButtonSteps(index, value)
  }  

  handleButtonSteps = (index, value) => {
    switch(index) {
      case 0: this.setState({ buttonsSteps: {...this.state.buttonsSteps, buttonForm1: value } }); break;
      case 1: this.setState({ buttonsSteps: {...this.state.buttonsSteps, buttonForm2: value } }); break;
      case 2: this.setState({ buttonsSteps: {...this.state.buttonsSteps, buttonForm3: value } }); break;
    }
  }

  nextStep = () => this.setState({stepForm: this.state.stepForm + 1})
  previewStep = () => this.setState({stepForm: this.state.stepForm - 1})
  handleSignatory = () => e => {
      this.setState({
        signForm3: {
          ...this.state.signForm3,
          is_signatory: e.target.checked
        }
      })
      this.handleSignForms(this.state.stepForm)
  }
  prevRegister = () => {this.setState({camera: false, stepForm: this.state.stepForm - 1})}

  handleVerifyEmailCode = vals => {
    if (vals === localStorage.getItem("emailValidationCode")) {
      this.setState({checkingEmail: true})
      const body = JSON.stringify({
        "status_account": 'ACT'
      });
      axios.patch('http://172.20.10.3:8000/api/v1/users/active_acccount/', body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
      })
      .then((response) => {
        console.log(response.data)
        setTimeout(() => {
          this.setState({checkingEmail: false, verifyEmail: true})
        }, 3000);
      }).catch((error) => {
        console.log('response', error.response.data['error'])
        alert(error.response.data['error'])
      })
    }
    
    /*axios.post('http://172.17.102.25:8000/api/v1/users/create/', body, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log(response.data)
    })*/
  }
  
  handleSelectInput = event => {
    let validateForm = ''
    console.log('eventValue', event.target.value)
    verifyLength(event.target.value, 2) ? validateForm = 'sucess' : validateForm = 'error'
    this.setState({
      signForm2: {
        ...this.state.signForm2,
        company: event.target.value
      },
      controlForm2: {
        ...this.state.controlForm2,
        companyForm: validateForm
      }
    })
    this.handleSignForms(this.state.stepForm)
  }
  generateMasterPassword = () => setMnemonicPhrase()

  render() {
    const { classes } = this.props;
    const { camera, dni, docIdCounter, checkingScanner, checkedScanner, checkingEmail, verifyEmail, stepForm} = this.state
    const optionsEntities = this.state.entities.map(option => {
      const firstLetter = option.name[0].toUpperCase();
      return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
  })
    console.log('dni', dni)
    console.log('step', stepForm)
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
                !camera && !dni && !verifyEmail ? (
                  <div>
                    <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={6}>
                        { 
                          stepForm == 0 ? (
                            <div>
                              <form className={classes.form}>
                              <CustomInput
                                success={this.state.controlForm.nameForm === "success"}
                                error={this.state.controlForm.nameForm === "error"}
                                formControlProps={{
                                  fullWidth: true,
                                  className: classes.customFormControlClasses
                                }}
                                id="name"
                                inputProps={{
                                  onChange: (event) => this.handleInput('name', event),
                                  type: 'text',
                                  value: this.state.signForm.name,
                                  startAdornment: (
                                    <InputAdornment
                                      position="start"
                                      className={classes.inputAdornment}
                                    >
                                      <Face className={classes.inputAdornmentIcon} />
                                    </InputAdornment>
                                  ),
                                  placeholder: "Nombre",
                                }}
                              />
                              <CustomInput
                                success={this.state.controlForm.surnameForm === "success"}
                                error={this.state.controlForm.surnameForm === "error"}
                                formControlProps={{
                                  fullWidth: true,
                                  className: classes.customFormControlClasses
                                }}
                                id="surname"
                                inputProps={{
                                  onChange: (event) => this.handleInput('surname', event),
                                  type: 'text',
                                  value: this.state.signForm.surname,
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
                                success={this.state.controlForm.emailForm === "success"}
                                error={this.state.controlForm.emailForm === "error"}
                                formControlProps={{
                                  fullWidth: true,
                                  className: classes.customFormControlClasses
                                }}
                                id="email"
                                inputProps={{
                                  onChange: (event) => this.handleInput('email', event),
                                  type: 'email',
                                  value: this.state.signForm.email,
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
                                success={this.state.controlForm.passwordForm === "success"}
                                error={this.state.controlForm.passwordForm === "error"}
                                formControlProps={{
                                  fullWidth: true,
                                  className: classes.customFormControlClasses
                                }}
                                id="password"
                                inputProps={{
                                  onChange: (event) => this.handleInput('password', event),
                                  type: 'password',
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
                                <Button round color="primary" disabled={!this.state.buttonsSteps.buttonForm1} onClick={this.nextStep}>
                                  Continuar
                                </Button>
                              </div>
                            </form>
                          </div>
                          ) : stepForm == 1 ? (
                            <div>
                              <form className={classes.form}>
                                <CustomInput
                                  success={this.state.controlForm2.phoneForm === "success"}
                                  error={this.state.controlForm2.phoneForm === "error"}
                                  formControlProps={{
                                    fullWidth: true,
                                    className: classes.customFormControlClasses
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.handleInput('phone', event),
                                    type: 'number',
                                    value: this.state.signForm2.phone,
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
                                  success={this.state.controlForm2.addressForm === "success"}
                                  error={this.state.controlForm2.addressForm === "error"}
                                  formControlProps={{
                                    fullWidth: true,
                                    className: classes.customFormControlClasses
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.handleInput('address', event),
                                    type: 'text',
                                    value: this.state.signForm2.address,
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
                                <div className={classes.selectCenter}>
                                  <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    options={optionsEntities.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    groupBy={option => option.firstLetter}
                                    getOptionLabel={option => option.name}
                                    style={{ width: 300 }}
                                    disableClearable
                                    onSelect={(event) => this.handleSelectInput(event)}
                                    onChange={(event) => this.handleInput('company', event)}
                                    renderInput={params => (
                                      <TextField 
                                        {...params} 
                                        label="Empresa" 
                                        margin="normal" 
                                        variant="outlined" 
                                        fullWidth 
                                        onChange={(event) => this.handleInput('company', event)}
                                        onSelect={(event) => this.handleSelectInput(event)}
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                      />
                                    )}
                                  />
                                  {/*<Select
                                    MenuProps={{
                                      className: classes.selectMenu
                                    }}
                                    classes={{
                                      select: classes.select
                                    }}
                                    placeholder="Seleccione una entidad"
                                    value={this.state.signForm2.company}
                                    onChange={this.handleSelector}
                                  >
                                    {
                                      this.state.entities.map(e => (
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem
                                          }}
                                          value={e.name}
                                        >
                                          {e.name}
                                        </MenuItem>
                                      ))
                                    }
                                  </Select>*/}
                                </div>
                                <CustomInput
                                  success={this.state.controlForm2.jobForm === "success"}
                                  error={this.state.controlForm2.jobForm === "error"}
                                  formControlProps={{
                                    fullWidth: true,
                                    className: classes.customFormControlClasses
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.handleInput('job', event),
                                    type: 'text',
                                    value: this.state.signForm2.job,
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
                              </form>
                              <div className={classes.center}>
                                <Button className={classes.buttonCenter} round color="warning" onClick={this.previewStep}>
                                  Atrás
                                </Button>
                                <Button className={classes.buttonCenter} round color="primary" disabled={!this.state.buttonsSteps.buttonForm2} onClick={this.nextStep}>
                                  Continuar
                                </Button>
                              </div>
                            </div>
                          ) : stepForm == 2 ? (
                            <div>
                              <form className={classes.form}>
                                <div className={classes.selectCenter}>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu
                                    }}
                                    classes={{
                                      select: classes.select
                                    }}
                                    value={this.state.signForm3.type_doc}
                                    onChange={this.handleSelector}
                                  >
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem
                                      }}
                                      value="NIF"
                                    >
                                      NIF
                                    </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem
                                      }}
                                      value="PAS"
                                    >
                                      PAS
                                    </MenuItem>
                                  </Select>
                                </div>
                                <CustomInput
                                  success={this.state.controlForm3.doc_numberForm === "success"}
                                  error={this.state.controlForm3.doc_numberForm === "error"}
                                  formControlProps={{
                                    fullWidth: true,
                                    className: classes.customFormControlClasses
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.handleInput('doc_number', event),
                                    type: 'text',
                                    value: this.state.signForm3.doc_number,
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
                                <div className={classes.selectCenter}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={this.state.signForm3.is_signatory}
                                        onChange={this.handleSignatory()}
                                        value={this.state.signForm3.is_signatory}
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
                                    label={this.state.signForm3.is_signatory === true ? "Firmante" : "No firmante"}
                                  />
                                </div>
                                <div className={classes.selectCenter}>
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
                                </div>
                              </form>
                              
                              <div className={classes.center}>
                                <Button className={classes.buttonCenter} round color="warning" onClick={this.previewStep}>
                                  Atrás
                                </Button>
                                <Button className={classes.buttonCenter} round color="primary" disabled={!this.state.buttonsSteps.buttonForm3} onClick={this.nextStep}>
                                  Continuar
                                </Button>
                              </div>
                            </div>
                          ) : stepForm == 3 ? (
                            <div className={classes.cardTitle2}>
                                <h3 style={{marginBottom: "30px"}}>¡Escanea tu Documento de Identidad!</h3>
                                {
                                  !checkingScanner && !checkedScanner && docIdCounter < 2 ? (
                                    <Camera 
                                      onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                                      onTakePhotoAnimationDone = { (dataUri) => { this.onTakePhotoAnimationDone(dataUri) } }
                                      imageType = {IMAGE_TYPES.JPG}
                                      isSilentMode = {true}
                                      onCameraStart = { (stream) => { this.onCameraStart(stream); } }
                                      onCameraStop = { () => { this.onCameraStop(); } } />
                                  ) : !checkedScanner ? (
                                    <div className={classes.cardTitle3}>
                                        <PushSpinner
                                            size={60}
                                            color="#f0a958"
                                            loading={checkingScanner}
                                        />
                                    </div>
                                  ) : (
                                    <div className={classes.cardTitle2}>
                                      <p style={{marginBottom: "30px"}}>¡Documento registrado correctamente!</p>
                                      <Success type="sucess" />
                                      <div className={classes.center}>
                                        <Button round color="primary" onClick={this.getDoubleFactorCode}>
                                          Verificar
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                }
                            </div>
                          ) : stepForm == 4 ? (
                            <div className={classes.cardTitle2}>
                              <h3 style={{marginBottom: "30px"}}>Introduce el código que has recibido en tu correo electrónico</h3>
                              {
                                !checkingEmail && !verifyEmail ? (
                                  <div style={styleVerifyCode}>
                                    <ReactCodeInput 
                                      ref={this.inputVerifyCode}
                                      className="custom-class"
                                      onChange={this.handleVerifyCodeChange}
                                      onComplete={val => this.handleVerifyEmailCode(val)}
                                    />
                                  </div>
                                ) : !verifyEmail ? (
                                  <div className={classes.cardTitle3}>
                                      <PushSpinner
                                          size={60}
                                          color="#f0a958"
                                          loading={checkingEmail}
                                      />
                                  </div>
                                ) : (
                                  <div className={classes.cardTitle2}>
                                    <p style={{marginBottom: "30px"}}>¡Cuenta registrada correctamente!</p>
                                    <Success type="success" />
                                    <div className={classes.center}>
                                    <NavLink to={"/admin/dashboard"}>
                                      <Button round color="primary" onClick={this.testID}>
                                        Acceder
                                      </Button>
                                    </NavLink>
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          ) : stepForm == 5 ? (
                            <div className={classes.cardTitle2}>
                                <h3 style={{marginBottom: "30px"}}>¡Apunta tu contraseña maestra!</h3>
                                <h5>En SCAPESHIFT se trabaja con información muy importante, y en la compañía existe una gran sensibilidad por la seguridad del usuario. Es por lo que se convierte en imperativo este paso en el proceso de registro: el test de Blas, que mediante 12 palabras factor de seguridad bla bla bla blabla...</h5>
                                <h4 style={{color: "black", fontWeight: "bold"}}>{this.generateMasterPassword()}</h4>
                            </div>
                          ) : null
                        }
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  </div>
                ) : camera ? (
                  <div></div>
                ) : dni ? (
                  <div></div>
                ) : null
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
