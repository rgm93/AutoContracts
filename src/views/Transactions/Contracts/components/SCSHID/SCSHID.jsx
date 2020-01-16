import React, { Component } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import SignaturePad from 'react-signature-canvas'
import './SCSHID.css';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import {
  verifyMnemonicPhrase,
  setSignature
} from "../../functions/functionsContract.js";

export default class SCSHID extends React.Component {
  state = {
    trimmedDataURL: null,
    mnemonicEncrypted: '',
    mnemonicPhrase: '',
    real: false
  }
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  validate = () => {
    if (this.sigPad.getTrimmedCanvas() !== [] && this.state.mnemonicPhrase !== '') {
      this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
      var i = setSignature(this.state.trimmedDataURL)
      var v = verifyMnemonicPhrase(0, this.state.mnemonicPhrase) // 0 is the user's id
      if (v) { 
        this.setState({real: v});
      } 
    } else if (this.sigPad.getSignaturePad()._data.length == 0) {
      alert('Debe dibujar su firma en el lienzo')
    } else if (this.state.mnemonicPhrase === '') {
      alert('Debe escribir su contraseña basada en 12 palabras')
    }
  }
  handleInput = (type, e) => {
    switch(type) {
      case 'mnemonic':
        this.setState({mnemonicPhrase: e.target.value});
        break;
    }
  }
  render () {
    return (
      <div className="sigContainer">
          <h3>Firma</h3>
          <h5>Utiliza el ratón para trazar tu firma</h5>
            <SignaturePad canvasProps={{className: "sigPad"}}
              ref={(ref) => { this.sigPad = ref }} />
          <div style={{width: 'auto', marginTop: "3%"}}>
            <button className="buttonSignClear" onClick={this.clear}>
              Borrar
            </button>
          </div>
          <h3>Doble factor de autentificación</h3>
          <h4>Escribe la contraseña maestra proporcionada</h4>
          <div className="mnemonicInput">
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                id="error"
                error
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => this.handleInput('mnemonic', event),
                  type: 'text',
                  placeholder: "Contraseña maestra",
                }}
              />
            </GridItem>
          </GridContainer>
          </div>
          
          
          <button className="buttonSignConfirm" onClick={this.validate}>
              Validar
          </button>
       </div>
      )
  }
}
