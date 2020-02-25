import React, { Component } from "react";
//import PropTypes from "prop-types";

import '../steps/multisteps.css';
//import { steps } from 'views/Transactions/Contracts/AssignmentContract/steps/steps';
import AssignmentContractSteps from '../steps/AssignmentContractSteps';
import AssignmentContractPreviewSteps from '../steps/AssignmentContractPreviewSteps';
import contract1 from "../json/contract.json";
import contract2 from "../json/contract2.json";
import contract3 from "../json/contract3.json";
import AssignmentContractFinal from "../steps/AssignmentContractFinal";
import Stepper from 'react-stepper-horizontal'
//import axios from "axios";


const schema = [contract1, contract2]
const steps = [
   {
      title: '1. Datos del contrato'
   },
   {
      title: '2. Resumen'
   },
   {
      title: '3. Borrador'
   },
   {
      title: '4. Firma'
   }
]

class AssignmentContract extends Component {
   state = {
      step: 0,
      stepForm: 0,
      forms: [],
      previewForm: [],
      previewStep: true,
   }

   scrollUp = () => {
      var sc = document.getElementsByClassName('Dashboard-mainPanel-2')[0];
      sc !== undefined ? sc.scrollTo(0,0) : window.scrollTo(0,0);
   }

   nextFormStep = () => {
      this.scrollUp();
      this.setState({ stepForm: this.state.stepForm + 1 })
      if (this.state.stepForm + 1 === schema.length) { this.nextStep() }
   }

   prevFormStep = () => {
      this.scrollUp();
      this.setState({ stepForm: this.state.stepForm - 1 })
      const stepMinus = this.state.stepForm - 1;
      if (stepMinus < schema.length && stepMinus > 0) { this.prevStep() }
   }

   nextStep = () => {  
      this.scrollUp();
      this.setState({ step: this.state.step + 1 }) 
   }

   prevStep = () => {
      this.scrollUp();
      this.setState({ step: this.state.step - 1 })
      const stepMinus = this.state.step - 1;
      if (stepMinus < schema.length && stepMinus > 0) { this.setState({ stepForm: this.state.stepForm - 1 }) }
   }

   handleChange = (form) => {
      console.log('f', form)
      if(!this.state.forms.includes(form))
      {
         this.setState({forms: [...this.state.forms, form]})
      }
   }

   handleChangePreview = (form) => {
      /*const body = JSON.stringify({
         "form": form
       })
       axios.post('http://172.17.102.25:8000/api/v1/contract/checkEntities/', body, {
           headers: {
             'Content-Type': 'application/json',
           }
         })
         .then((response) => {
           console.log(response.data)
           if(response.data) {
               if(!this.state.previewForm.includes(form))
               {
                  this.setState({previewForm: [...this.state.previewForm, form], previewStep: false})
               }
           }
         }).catch((error) => {
            console.log('error', error)
         })*/
      this.scrollUp();
      if(!this.state.previewForm.includes(form))
      {
         this.setState({previewForm: [...this.state.previewForm, form], previewStep: false})
      }
   }

   render() {
      const step = this.state.step - 1
      const { previewForm, forms, stepForm, previewStep } = this.state
      //console.log('previewForm', previewForm)
      //console.log('forms', forms)
      
      return (
         <div className="contractPreviewStepsStyle">
            {
               previewStep ? (
                  <AssignmentContractPreviewSteps 
                     contract={contract3}
                     handleChangePreview = {this.handleChangePreview}
                     step={stepForm}
                     formSaved={this.state.previewForm[stepForm]}
                  />
               ) : (
                  <div>
                     <Stepper steps={steps} activeStep={step} />
                     {  
                        stepForm < schema.length ? (
                           <div className="contractStepsStyle">
                              <AssignmentContractSteps 
                                 entities={previewForm[0]}
                                 contract={schema[stepForm]}
                                 handleChange = {this.handleChange}
                                 nextStep={this.nextFormStep} 
                                 prevStep={this.state.stepForm !== 0 ? this.prevFormStep : null}
                                 step={stepForm}
                                 formSaved={this.state.forms[stepForm]}
                                 />
                           </div>
                           
                        ) : (
                           <AssignmentContractFinal
                              previewForm={previewForm}
                              forms={forms}
                              nextStep={this.nextStep} 
                              prevStep={this.state.step !== 0 ? this.prevStep : null}
                              step={step}
                           /> 
                        )
                     } 
                  </div>
               )
            }
         </div>
      );
   }
}

export default AssignmentContract;
