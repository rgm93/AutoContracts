import React from "react";
import PropTypes from "prop-types";

import Form from "react-jsonschema-form";
import "views/Transactions/Contracts/AssignmentContract/contract/AssignmentContract.css";
import uischema from "views/Transactions/Contracts/AssignmentContract/json/uiSchema.json"
import formdata from 'views/Transactions/Contracts/AssignmentContract/json/formData.json';
import PDFContract from 'views/Transactions/Contracts/AssignmentContract/PDFContract';
import ReactS3 from 'react-s3';
import AssignmentContractResume from 'views/Transactions/Contracts/AssignmentContract/steps/AssignmentContractResume'
import SCSHID from './SCSHID'
import PDFEditor from '../PDFEditor'
import mockdata from '../json/mockup.json';
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as faceapi from 'face-api.js';
import PDFContractPreview from "../PDFContractPreview";
import { print } from "../converters/utils";

// Blockchain Configuration
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const config = {
   bucketName: 'scsh-pdf',
   dirName: 'pdf', /* optional */
   region: 'eu-west-1',
   accessKeyId: 'AKIAU3MFK7JRWHJVDT4H',
   secretAccessKey: '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',
}

const pinataApiKey = "f96160442ac769baa972";
const pinataSecretApiKey = "2ddd72a7f8b78d6dcb43e3b350f115abd9a112a5bf62c7c948d2bb3f4614070a";

const testAuthentication = () => {
   const url = `https://api.pinata.cloud/data/testAuthentication`;
   return axios
       .get(url, {
            headers: {
               'pinata_api_key': pinataApiKey,
               'pinata_secret_api_key': pinataSecretApiKey
            }
       })
       .then(function (response) {
           //handle your response here
       })
       .catch(function (error) {
           //handle error here
       });
};

const pinFileToIPFS = (file, pinataApiKey, pinataSecretApiKey) => {
   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

   //we gather a local file for this example, but any valid readStream source will work here.
   let data = new FormData();
   data.append('file', fs.createReadStream('./contract.pdf'));

   //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
   //metadata is optional
   const metadata = JSON.stringify({
       name: 'contract',
       keyvalues: {
           exampleKey: 'contractKey'
       }
   });
   data.append('pinataMetadata', metadata);

   //pinataOptions are optional
   const pinataOptions = JSON.stringify({
       cidVersion: 0
   });
   data.append('pinataOptions', pinataOptions);

   return axios.post(url,
       data,
       {
           maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
           headers: {
               'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
               'pinata_api_key': pinataApiKey,
               'pinata_secret_api_key': pinataSecretApiKey
           }
       }
   ).then(function (response) {
       //handle response here
   }).catch(function (error) {
       //handle error here
   });
};

// PINATA - IPFS
// API KEY: f96160442ac769baa972
// API SECRET KEY: 2ddd72a7f8b78d6dcb43e3b350f115abd9a112a5bf62c7c948d2bb3f4614070a

class AssignmentContractFinal extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         form: {},
         html: '',
         pdfGenerated: false,
         isEditing: false,
         isDrafting: false,
         isSigning: false,
         textPDF: '',
         blob: []
      }
   }

   componentWillMount() {
      this.setState({form: mockdata, isResuming: true})
   }

   handleHTML = (html) => this.setState({html})

   next = (type) => {
      console.log('typenext', type)
      switch(type) {
         case 'editor': this.setState({isEditing: true, isResuming: false}); break;
         case 'preview': this.setState({isDrafting: true, isEditing: false}); break;
         case 'sign': this.setState({isSigning: true, isDrafting: false}); break;
      }
      this.props.nextStep()
   }

   back = (type) => {
      console.log('typeback', type)
      switch(type) {
         case 'resume': this.setState({isResuming: false}); break;
         case 'editor': this.setState({isEditing: false, isResuming: true}); break;
         case 'preview': this.setState({isDrafting: false, isEditing: true}); break;
         case 'sign': this.setState({isSigning: false, isDrafting: true}); break;
      }
      this.props.prevStep()
   }

   /*signContractBlockchain = () => {
      
      // BLOCKCHAIN

      pinFileToIPFS(pinataApiKey, pinataSecretApiKey);
      
      console.log('Guardando en AWS...');
      ReactS3.uploadFile(this.state.blob, config)
      .then((data) => {
         console.log(data.location)
      })
      .catch((err) => {
         alert(err)
      })

   } */


   render() {
      console.log('this.state.html', this.state.html)
      return (
         <div>
            {
               this.state.isResuming ? (
                  <div>
                     <h3> Por favor, compruebe que todos los datos están correctos antes de generar el contrato </h3>
                     <AssignmentContractResume data={this.state.form} />
                     <div className="buttons">
                        <button className="buttonStepsBack" onClick={() => this.back('resume')}>Atrás</button>
                        <button 
                           className="buttonGeneratePDF" 
                           onClick={() => this.next('editor')}>Ir a editor</button>
                     </div>
                     
                  </div>
               ) : this.state.isEditing ? (
                  <div>
                     <div className="pdf"></div>
                     <PDFEditor 
                        data={this.state.html !== '' ? ['html', this.state.html] : ['form', this.state.form]} 
                        next={this.next} 
                        back={this.back} 
                        handleHTML={this.handleHTML}
                        state={this.state}
                     />
                  </div>
               ) : this.state.isDrafting ? (
                  <div>
                     {/*<PDFContract data={this.state.form} />*/}
                     <PDFContractPreview data={this.state.html} />
                     <div className="buttons">
                        <button className="buttonStepsBack" onClick={() => this.back('preview')}>Atrás</button>
                        <button className="buttonGeneratePDF" onClick={() => this.next('sign')}>Firmar</button>
                     </div>
                  </div>
               ) : this.state.isSigning ? (
                  <div>
                     <SCSHID next={this.next('contract')} back={() => this.back('preview')}/>
                  </div>
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
               ) 
            }
         </div>
      );
   }
}

export default AssignmentContractFinal;
