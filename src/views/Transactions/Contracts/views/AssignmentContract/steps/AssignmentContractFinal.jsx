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
import PDFEditor from "../../PDFEditor";
//import PDFEditor5 from "../../PDFEditor5"
import mockdata from "../../AssignmentContract/json/mockup.json";

//import PDFContractPreview from "../../PDFContractPreview";
import { Tab, Row, Col, Nav } from 'react-bootstrap'

//import { BugReport, Code, Cloud } from "@material-ui/icons"


import { contract } from "../mockups/mockContract";
import {
  sendPreviewContract
  /*getPreviewContract*/
} from "../../../functions/functionsContract.js";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TasksList from "../../../components/TasksList/TasksList"
import PDFContractViewer from "../../../components/PDFContractViewer/PDFContractViewer"

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
      isFinal: false,
      textPDF: "",
      agreeOnBoth: false,
      selectSend: "abogado_cedente",
      blob: [],
      idContract: "",
      htmlFinal: ""
    };
  }

  handleChange = (event, newValue) => {
    this.setState({valueTabs: newValue});
  };

  componentDidMount() {
    this.setState({ form: this.props.forms, isResuming: true }); //mockdata
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
        this.setState({ isSigning: false, isFinal: true });
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
  getData = () => this.state.html !== '' ? this.state.html : contract(this.state.form)
  sendData = () => this.state.html !== "" ? ["html", this.state.html] : ["form", this.state.form]
  getHTML = (data) => this.setState({html: data})


  setSign = (sign) => {

    //console.log('z', this.getData())
    //console.log('sign', sign)

    //console.log('dom', doc)
    //this.setState({html: doc})
    /*var dc = new Promise(function(resolve, reject) {
      resolve(doc);
    }.bind(this)).then((docdom) => {
      this.setState({html: docdom })
    });*/


    /*var data = this.getData();
    data = data.replace(/<img id="firma1" src=([\s\S]*) style="width: 100px; height: 100px" \/>/gi, `<img id="firma1" src=${sign} style="width: 100px; height: 100px" />`);
    //console.log('a', a)
    //this.sendData(a)
    this.setState({html: data});
    this.next("contract")*/
    //document.createElement('html').getElementById

    /*var doc = document.createElement('html');
    doc.innerHTML = this.getData().trim();
    console.log('firma1', doc.getElementsByTagName("firma1"))
    doc.getElementsByTagName("firma1")[0].setAttribute("src", sign);
    var docFinal = new XMLSerializer().serializeToString(doc.getRootNode())
    console.log('llego', docFinal)
    this.setState({html: docFinal})*/
    
    /*var dc = new Promise(function(resolve, reject) {
      var doc = document.createElement('html');
      doc.innerHTML = this.getData().trim();
      resolve(doc);
    }.bind(this)).then(function(docdom) {
      return new Promise(function(resolve, reject) {
        docdom.getElementsByTagName
        docdom.getElementsByTagName("firma1").src = sign;
        resolve(docdom)
      }).then(function(finalDoc) {
        var docFinal = new XMLSerializer().serializeToString(finalDoc.getRootNode())
        console.log('llego', docFinal)
        return docFinal
    })});

    if (dc !== '') { 
      console.log('final', dc)
      this.setState({html: dc}) 
    }*/
    
    /*//console.log('llego', doc)
    console.log('firma1', doc.getElementsByTagName("firma1"))
    console.log('sign', sign)
    doc.getElementsByTagName("firma1")[0].setAttribute("src", sign.toString());
    var docFinal = this.xml2string(doc.getRootNode())
    //var docFinal = doc.getElementById('div').innerHTML;
    console.log('llego', docFinal)
    this.setState({html: docFinal})*/
  }

  render() {
    const { /*valueTabs,*/ html, form } = this.state
    console.log('formsFinal', form)
    console.log('html', html)
    return (
      <div>
        {this.state.isResuming ? (
          <div>
            <h3>
              {" "}
              Por favor, compruebe que todos los datos están correctos antes de
              generar el contrato{" "}
            </h3>
            <AssignmentContractResum data={this.state.form} />
            <div className="buttons">
              <button
                className="buttonStepsBack"
                onClick={() => this.back("resume")}
              >
                Atrás
              </button>
              <button
                className="buttonGeneratePDF"
                onClick={() => this.next("preview")}
              >
                Generar Borrador
              </button>
            </div>
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
            <div style={{width: '50%',  marginTop: "4%"}}>
              {/*<PDFContractPreview
                data={this.getData()}
                html={this.getHTML}
              />*/}
              <PDFContractViewer data={this.getData()} html={this.getHTML} />
            </div>
            
            <div style={{width: '50%'}}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row style={{padding: "15% 10% 0% 10%", display: "block"}}>
                  <Row sm={4} style={{flexDirection: "row !important", justifyContent: "center"}}>
                    <Nav variant="pills" style={{flexDirection: "row !important", justifyContent: "center"}}>
                      <Nav.Item>
                        <Nav.Link eventKey="first">Enviar contrato</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Row>
                  <Col sm={12}>
                    <Tab.Content>
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
          <div>
            <SCSHID
                  next={() => this.next("contract")}
                  data={this.getData()}
                  handleHTML={this.handleHTML}
            />
            {
                /*}: !this.state.isSigning ? (
                <SCSHID
                  next={() => this.next("contract")}
                  back={() => this.back("preview")}
                />
            ) */
            
            /*<div className="pdf"></div>
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
        ) : this.state.isFinal ? (
          <div style={{width: "100%", marginTop: "5%"}}>
            <PDFContractViewer data={this.getData()} height="450px" />
          </div>
        ) : null }
      </div>
    );
  }
}

export default AssignmentContractFinal;
