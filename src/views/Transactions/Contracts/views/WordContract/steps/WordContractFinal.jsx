import React from "react";
//import ReactDOM from "react-dom";
//import PropTypes from "prop-types";

//import Form from "react-jsonschema-form";
import "../contract/WordContract.css";
//import uischema from "../../AssignmentContract/json/uiSchema.json";
//import formdata from "../../AssignmentContract/json/formData.json";
//import ReactS3 from "react-s3";
import SCSHID from "../../../components/SCSHID/SCSHID";
import PDFEditor from "../../../components/PDFEditor/PDFEditor";
import SendParticipantsSelector from "../../../components/SendParticipantsSelector/SendParticipantsSelector";
import mockdata from "../../AssignmentContract/json/mockup.json";

import PDFContractViewer from "../../../components/PDFContractViewer/PDFContractViewer"
import { Tab, Row, Col, Nav } from 'react-bootstrap'

//import { BugReport, Code, Cloud } from "@material-ui/icons"


//import { contract } from "../../AssignmentContract/mockups/mockupContract";

import TasksList from "../../../components/TasksList/TasksList"
import CustomModalSendParticipants from "components/CustomModal/CustomModalSendParticipants/CustomModalSendParticipants.jsx"
var mammoth = require("mammoth");
//let doc = '';



class AssignmentContractFinal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      html: "",
      pdfGenerated: false,
      state: '',
      textPDF: "",
      agreeOnBoth: false,
      blob: [],
      idContract: "",
      file: "",
      loadedDrawer: false
    };
  }

  

  handleChange = (event, newValue) => {
    this.setState({valueTabs: newValue});
  };

  componentDidMount() {
    this.setState({ 
      form: mockdata, 
      state: this.props.state != undefined ? this.props.state : 'isResuming' 
    });
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

  getData = () => this.state.html !== '' ? this.state.html : ''
  
  sendData = () => this.state.html !== "" ? ["html", this.state.html] : ["form", this.state.form]

  handleUploadDocument = () => {
    this.setState({loadedDrawer: false})
    this.next("isDrafting")
  }

  readFileInputEventAsArrayBuffer = (e, callback) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(loadEvent) {
        var arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer);
    };
    
    reader.readAsArrayBuffer(file);
  }

  onChange = (e) => {
    this.readFileInputEventAsArrayBuffer(e, function(arrayBuffer) {
      mammoth.convertToHtml({arrayBuffer: arrayBuffer})
          .then((result) => {
              this.setState({html: result.value})
          }).done();
    }.bind(this));
  }
  
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
          <div className="importContent">
            <label className="custom-file-upload">
              <input type="file" onChange={this.onChange}/>
               Cargar documento
            </label>
            { this.state.html !== '' ? (
              <div>
                <PDFContractViewer
                  data={this.getData()}
                  viewerSpinnerFinal="viewerSpinnerFinal"
                  loaded={this.setLoaded}
                />
                { 
                  this.state.loadedDrawer ? (
                    <button onClick={this.handleUploadDocument} className="importButton">Importar</button>
                  ) : null 
                }
                  
              </div>
            ) : null }
            
          </div>
        ) : state === 'isEditing' ? (
          <div>
            <div className="pdf"></div>
            <PDFEditor
              data={this.sendData()}
              changeView={this.changeView}
              handleHTML={this.handleHTML}
              state={this.state}
            />
          </div>
        ) : state === 'isDrafting' ? (
          <div>
            <div className="viewerDraftContainer">
              <div style={{width: '100%'}}>
                <PDFContractViewer
                  data={this.getData()}
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
              next={() => this.next("contract")}
              back={() => this.back("preview")}
            />
        ) : state === 'isFinal' ? (
          <div className="finalViewer">
            <PDFContractViewer 
              data={this.getData()} 
              height="450px" viewerSpinnerFinal="viewerSpinnerFinal"
              loaded={this.setLoaded}/>
          </div>
        ) : null }
      </div>
    );
  }
}

export default AssignmentContractFinal;
