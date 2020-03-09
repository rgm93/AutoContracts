import React from "react";
//import ReactDOM from "react-dom";
//import PropTypes from "prop-types";

//import Form from "react-jsonschema-form";
import "../contract/AssignmentContract.css";
//import uischema from "../json/uiSchema.json";
//import formdata from "../json/formData.json";
//import ReactS3 from "react-s3";
import AssignmentContractResum from "./AssignmentContractResum";
import SCSHID from "../../../components/SCSHID/SCSHID";
import PDFEditor from "../../../components/PDFEditor/PDFEditor";
import SendParticipantsSelector from "../../../components/SendParticipantsSelector/SendParticipantsSelector";
//import PDFEditor5 from "../../PDFEditor5"
import mockdata from "../../AssignmentContract/json/mockup.json";

//import PDFContractPreview from "../../PDFContractPreview";
import { Tab, Row, Col, Nav } from 'react-bootstrap'

//import { BugReport, Code, Cloud } from "@material-ui/icons"


import { contractMockup } from "../mockups/mockupContract";
import { contract } from "../mockups/mockContract";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TasksList from "../../../components/TasksList/TasksList"
import PDFContractViewer from "../../../components/PDFContractViewer/PDFContractViewer"

import CustomModalSendParticipants from "components/CustomModal/CustomModalSendParticipants/CustomModalSendParticipants.jsx"

class AssignmentContractFinal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      html: "",
      pdfGenerated: false,
      state: '',
      isMocked: false,
      textPDF: "",
      agreeOnBoth: false,
      selectSend: "abogado_cedente",
      blob: [],
      idContract: "",
      htmlFinal: "",
      loadedDrawer: false
    };
  }

  handleChange = (event, newValue) => {
    this.setState({valueTabs: newValue});
  };

  componentDidMount() {
    console.log('eses', this.props.isMocked)
    this.setState({ 
      form: this.props.isMocked ? mockdata : this.props.forms, 
      state: this.props.state != undefined ? this.props.state : 'isResuming' ,
      isMocked: this.props.isMocked
    }); //mockdata
  }

  scrollUp = () => {
    var sc = document.getElementsByClassName('Dashboard-mainPanel-2')[0];
    sc !== undefined ? sc.scrollTo(0,0) : window.scrollTo(0,0);
  }

  handleHTML = html => this.setState({ html });

  changeView = state => {
    this.scrollUp();
    this.setState({loadedDrawer: false})
    this.setState({ state });
  };
  next = state => {
    this.scrollUp();
    this.setState({ state });
    this.props.nextStep();
  };

  back = state => {
    this.scrollUp();
    this.setState({ state });
    this.props.prevStep();
  };

  getData = () => {
    if (this.state.html !== '') {
      return this.state.html
    } else {
      console.log('isMocked', this.state.isMocked)
      if (this.state.isMocked) {
        return contractMockup(mockdata)
      } else return contract(this.state.form)
    }
    //this.state.html !== '' ? this.state.html : contract(this.state.form)
      
  }
  sendData = () => this.state.html !== "" ? ["html", this.state.html] : ["form", this.state.form]
  getHTML = (data) => this.setState({html: data})

  sendDrawer = participant => {
    console.log('sending to...', participant)
  }
  setLoaded = value => {
    this.setState({loadedDrawer: value})
  }
  render() {
    const { state, html, form } = this.state
    return (
      <div>
        {state === 'isResuming' ? (
          <div>
            <h3 style={{textAlign: 'center', width: 'calc(100% - 30px)', margin: '3% 0% 3% 0'}}>
              Por favor, compruebe que todos los datos están correctos antes de
              generar el contrato
            </h3>
            <AssignmentContractResum data={this.state.form} />
            <div className="buttons">
              <button
                className="buttonStepsBack"
                onClick={() => this.back("isResuming")}
              >
                Atrás
              </button>
              <button
                className="buttonGeneratePDF"
                onClick={() => this.next("isDrafting")}
              >
                Generar Borrador
              </button>
            </div>
          </div>
        ) : state === 'isEditing' ? (
          <div>
            <div className="pdf"></div>
            <PDFEditor
              data={this.sendData()}
              changeView={this.changeView}
              handleHTML={this.handleHTML}
              state={this.state}
              isMocked={this.state.isMocked}
            />
          </div>
        ) : state === 'isDrafting' ? (
          <div>
            <div className="viewerDraftContainer">
              <div style={{width: '100%'}}>
                <PDFContractViewer 
                  data={this.getData()} 
                  html={this.getHTML}
                  viewerSpinnerFinal="viewerSpinnerFinal"
                  loaded={this.setLoaded}
                  />
              </div>
            </div>
            <div className={!this.state.loadedDrawer ? "buttons" : "buttonsLoaded"}>
              <button
                className="buttonEditPDF"
                onClick={() => this.changeView("isEditing")}
              >
                Editar
              </button>
              <CustomModalSendParticipants 
                modalTitle="Enviar borrador"
                isButton={true}
                participants={[]}
                sendData={this.sendDrawer}
              />
              <button
                className="buttonGeneratePDF"
                //disabled={!this.state.agreeOnBoth}
                onClick={() => this.next("isSigning")}
              >
                Firmar
              </button>
            </div>
          </div>
        ) : state === 'isSigning' ? (
            <SCSHID
              next={() => this.next("isFinal")}
              data={this.getData()}
              handleHTML={this.handleHTML}
            />
        ) : state === 'isFinal' ? (
          <div className="finalViewer">
            <PDFContractViewer 
              data={this.getData()} 
              height="450px" viewerSpinnerFinal="viewerSpinnerFinal"
              loaded={this.setLoaded} />
          </div>
        ) : null }
      </div>
    );
  }
}

export default AssignmentContractFinal;
