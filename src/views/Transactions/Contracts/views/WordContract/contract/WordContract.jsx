import React, { Component } from "react";
//import PropTypes from "prop-types";

import '../steps/multisteps.css';
//import { steps } from 'views/Transactions/Contracts/AssignmentContract/steps/steps';
//import MultiStep from 'react-multistep';
import AssignmentContractSteps from '../../AssignmentContract/steps/AssignmentContractSteps';
import AssignmentContractPreviewSteps from '../../AssignmentContract/steps/AssignmentContractPreviewSteps';
import contract3 from "../../AssignmentContract/json/contract3.json";
import WordContractFinal from "../../WordContract/steps/WordContractFinal";
import Stepper from 'react-stepper-horizontal'
//import axios from "axios";

const steps = [
   {
      title: '1. Importar'
   },
   {
      title: '2. Borrador'
   },
   {
      title: '3. Firma'
   }
]

class WordContract extends Component {
   state = {
      step: 1,
      forms: [],
      previewForm: [],
      previewStep: true,
   }

   scrollUp = () => {
      document.getElementsByClassName('Dashboard-mainPanel-2 ')[0].scrollTo(0,0)
   }

   nextStep = () => {  
      
      this.setState({ step: this.state.step + 1 }) 
   }

   prevStep = () => {
      this.setState({ step: this.state.step - 1 })
      const stepMinus = this.state.step - 1;
   }

   handleChange = (form) => {
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
      if(!this.state.previewForm.includes(form))
      {
         this.setState({previewForm: [...this.state.previewForm, form], previewStep: false})
      }
   }

   

   render() {
      const step = this.state.step - 1
      const { previewStep, previewForm } = this.state
      console.log('step', step)
      return (
         <div className='container'>
            {
               previewStep ? (
                  <AssignmentContractPreviewSteps 
                     contract={contract3}
                     handleChangePreview = {this.handleChangePreview}
                     step={step}
                     formSaved={this.state.previewForm[step]}
                  />
               ) : (
                  <div>
                     <Stepper steps={steps} activeStep={step} />
                     {  
                        <WordContractFinal
                           forms={this.state.forms}
                           nextStep={this.nextStep} 
                           prevStep={this.state.step !== 0 ? this.prevStep : null}
                           step={step}
                        /> 
                     } 
                  </div>
               )
            }
         </div>
      );
   }
}

export default WordContract;
