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
import mockdata from "../../AssignmentContract/json/mockup.json";

import PDFContractViewer from "../../../components/PDFContractViewer/PDFContractViewer"
import { Tab, Row, Col, Nav } from 'react-bootstrap'

//import { BugReport, Code, Cloud } from "@material-ui/icons"


//import { contract } from "../../AssignmentContract/mockups/mockupContract";
import {
  sendPreviewContract
  /*getPreviewContract*/
} from "../../../functions/functionsContract.js";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TasksList from "../../../components/TasksList/TasksList"

var mammoth = require("mammoth");
//let doc = '';

class AssignmentContractFinal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      html: "",
      pdfGenerated: false,
      isEditing: false,
      isDrafting: false,
      isSigning: false,
      textPDF: "",
      agreeOnBoth: false,
      selectSend: "abogado_cedente",
      blob: [],
      idContract: "",
      file: ""
    };
  }

  

  handleChange = (event, newValue) => {
    this.setState({valueTabs: newValue});
  };

  componentDidMount() {
    this.setState({ form: mockdata, isResuming: true });
  }

  scrollUp = () => {
    var sc = document.getElementsByClassName('Dashboard-mainPanel-2')[0];
    sc !== undefined ? sc.scrollTo(0,0) : window.scrollTo(0,0);
  }

  handleHTML = html => this.setState({ html });

  changeView = type => {
    this.scrollUp();
    console.log("typeviewarona", type);
    switch (type) {
      case "editor":
        this.setState({ isEditing: true, isDrafting: false });
        break;
      case "preview":
        this.setState({ isDrafting: true, isEditing: false });
        break;
      default: break;
    }
  };
  next = type => {
    this.scrollUp();
    console.log("typenextarona", type);
    switch (type) {
      case "preview":
        this.setState({ isDrafting: true, isResuming: false });
        break;
      case "sign":
        this.setState({ isSigning: true, isDrafting: false });
        break;
      case "contract":
        break;
      default: break;

    }
    this.props.nextStep();
  };

  back = type => {
    this.scrollUp();
    console.log("typebackarona", type);
    switch (type) {
      case "resume":
        this.setState({ isResuming: false });
        break;
      case "preview":
        this.setState({ isDrafting: false, isEditing: true });
        break;
      case "sign":
        this.setState({ isSigning: false, isDrafting: true });
        break;
      default: break;
    }
    this.props.prevStep();
  };

  handleSelectSend = event => this.setState({ selectSend: event.target.value });
  getData = () => this.state.html !== '' ? this.state.html : ''
  sendData = () => this.state.html !== "" ? ["html", this.state.html] : ["form", this.state.form]

  handleUploadDocument = () => {
    this.next("preview")
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
  

  render() {
    //const value = this.state.valueTabs
    return (
      <div>
        {this.state.isResuming ? (
          
          <div className="importContent">
            <label className="custom-file-upload">
              <input type="file" onChange={this.onChange}/>
               Cargar documento
            </label>
            { this.state.html !== '' ? (
              <div>
                <PDFContractViewer
                  data={this.getData()}
                />
                <button onClick={this.handleUploadDocument} className="buttons">Importar</button>
              </div>
            ) : null }
            
          </div>
        ) : this.state.isEditing ? (
          <div>
            <div className="pdf"></div>
            <PDFEditor
              data={this.sendData()}
              changeView={this.changeView}
              handleHTML={this.handleHTML}
              state={this.state}
            />
          </div>
        ) : this.state.isDrafting ? (
          <div>
          <div style={{display: 'flex'}}>
            {/*<PDFContract data={this.state.form} />*/}
            <div style={{width: '50%', marginTop: "4%"}}>
              <PDFContractViewer
                data={this.getData()}
              />
            </div>
            
            <div style={{width: '50%'}}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row style={{padding: "15% 10% 0% 10%", display: "block"}}>
                  <Row sm={4} style={{flexDirection: "row !important", justifyContent: "center"}}>
                    <Nav variant="pills" style={{flexDirection: "row !important", justifyContent: "center"}}>
                      <Nav.Item>
                        <Nav.Link eventKey="first">Enviar contrato</Nav.Link>
                      </Nav.Item>
                      {/*<Nav.Item>
                        <Nav.Link eventKey="second">Estado del contrato</Nav.Link>
                      </Nav.Item>*/}
                      <Nav.Item>
                        <Nav.Link eventKey="second">Lista de tareas</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Row>
                  <Col sm={12}>
                    <Tab.Content style={{}}>
                      <Tab.Pane eventKey="first">
                          <div className="selCenter">
                            <Select
                              value={this.state.selectSend} 
                              onChange={this.handleSelectSend}
                            >
                              <MenuItem value={"abogado_cedente"}>Despacho Abogado</MenuItem>
                              <MenuItem value={"cesionario"}>Cesionario</MenuItem>
                              <MenuItem value={"abogado_cesionario"}>
                                Abogado Cesionario
                              </MenuItem>
                            </Select>
                          </div>
                          <div className="buttons">
                            <button
                              className="buttonGeneratePDF"
                              onClick={() => sendPreviewContract('edit', this.state.idContract, this.getData())}
                            >
                              Enviar
                            </button>
                        </div>
                        
                      </Tab.Pane>
                      {/*<Tab.Pane eventKey="second">
                        <h2 style={{ textAlign: "center", marginTop: "30px" }}>
                          Estado del contrato
                        </h2>
                        <div className="contractStates">
                          <div className="contractState">
                            <h3>Cedente</h3>
                            <div className="state">
                              <div id="dark_green" className="stateCircle"></div>
                              <span className="explanation">Validar</span>
                            </div>
                            <div className="state">
                              <div id="dark_red" className="stateCircle"></div>
                              <span className="explanation">Corregir</span>
                            </div>
                            <div className="state">
                              <div id="light_orange" className="stateCircle"></div>
                              <span className="explanation">Propuesto</span>
                            </div>
                          </div>
                          <div className="contractState">
                            <h3>Cesionario</h3>
                            <div className="state">
                              <div id="dark_green" className="stateCircle"></div>
                              <span className="explanation">Validar</span>
                            </div>
                            <div className="state">
                              <div id="dark_red" className="stateCircle"></div>
                              <span className="explanation">Corregir</span>
                            </div>
                            <div className="state">
                              <div id="light_orange" className="stateCircle"></div>
                              <span className="explanation">Propuesto</span>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>*/}
                      <Tab.Pane eventKey="second">
                        <div className="selCenter">
                          <TasksList />
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
          <div className="buttons">
            <button
              className="buttonEditPDF"
              onClick={() => this.changeView("editor")}
            >
              Editar
            </button>


            {/*<button
              className="buttonGeneratePDF"
              disabled={!this.state.agreeOnBoth}
              onClick={() => this.next("sign")}
            >
              Firmar
            </button>*/}


            <button
              className="buttonGeneratePDF"
              //disabled={!this.state.agreeOnBoth}
              onClick={() => this.next("sign")}
            >
              Firmar
            </button>
          </div>
          </div>
        ) : this.state.isSigning ? (
            <SCSHID
              next={() => this.next("contract")}
              back={() => this.back("preview")}
            />
        ) : (
          <div>
            {/*<div className="pdf"></div>
                     <PDFEditor 
                        data={this.state.form} 
                        next={this.next} 
                        back={this.back} 
                        handleHTML={this.handleHTML}
                        state={this.state}
                     />*/}

            {/*<PDFContract 
                        data={this.state.form}
                        //textPDF={this.setTextPDF}
                     />*/}
            {/*<PDFDownloadLink
                        document={<PDFContract data={this.state.form} />}
                        fileName="contract.pdf"
                        style={{
                           textDecoration: "none",
                           padding: "10px",
                           color: "#4a4a4a",
                           backgroundColor: "#f2f2f2",
                           border: "1px solid #4a4a4a"
                        }}
                     >
                        {({ blob, url, loading, error }) =>
                           loading ? "Loading document..." : "Download Pdf"
                        }
                     </PDFDownloadLink>*/}
            {/*<button 
                     className="buttonGenerateEditPDF" 
                  onClick={this.editContract}>Editar contrato</button>*/}
          </div>
        )}
      </div>
    );
  }
}

export default AssignmentContractFinal;
