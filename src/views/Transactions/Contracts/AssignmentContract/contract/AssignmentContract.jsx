import React, { Component } from "react";
import PropTypes from "prop-types";

import '../steps/multisteps.css';
//import { steps } from 'views/Transactions/Contracts/AssignmentContract/steps/steps';
import MultiStep from 'react-multistep';
import AssignmentContractSteps from '../steps/AssignmentContractSteps';
import contract1 from "views/Transactions/Contracts/AssignmentContract/json/contract.json";
import contract2 from "views/Transactions/Contracts/AssignmentContract/json/contract2.json";
import AssignmentContractFinal from "../steps/AssignmentContractFinal";
import Stepper from 'react-stepper-horizontal'

const schema = [contract1, contract2]
const steps = [
   {
      title: '1. Datos del contrato'
   },
   {
      title: '2. Resumen'
   },
   {
      title: '3. Editor'
   },
   {
      title: '4. Borrador'
   },
   {
      title: '5. Firma'
   }
]

class AssignmentContract extends Component {
   state = {
      step: 2,
      stepForm: 2,
      forms: []
   }

   nextFormStep = () => {
      const { stepForm } = this.state
      this.setState({
         stepForm: stepForm + 1
      })
      if (stepForm + 1 == schema.length) { this.nextStep() }
   }

   prevFormStep = () => {
      const { stepForm } = this.state
      this.setState({
         stepForm: stepForm - 1
      })
      if (stepForm - 1 == schema.length) { this.prevStep() }
   }

   nextStep = () => {
      const { step } = this.state
      this.setState({
         step: step + 1
      })
   }

   prevStep = () => {
      const { step } = this.state
      this.setState({
         step: step - 1
      })
   }

   handleChange = (form) => {
      if(!this.state.forms.includes(form))
      {
         this.setState({forms: [...this.state.forms, form]})
      }
   }

   render() {
      const step = this.state.step - 1;
      const stepForm = this.state.stepForm;
      console.log('stepprevf2', stepForm)
      console.log('schemaLenght', schema.length)
      return (
         <div className='container'>
            <Stepper steps={steps} activeStep={step} />
            {  
               stepForm < schema.lenght ? (
                  <div>
                     <p>hohswgds</p>
                     <AssignmentContractSteps 
                     contract={schema[stepForm]}
                     handleChange = {this.handleChange}
                     nextStep={this.nextFormStep} 
                     prevStep={this.state.stepForm != 0 ? this.prevFormStep : null}
                     step={stepForm}
                     formSaved={this.state.forms[stepForm]}
                     />
                  </div>
                  
               ) : (
                  <AssignmentContractFinal
                     forms={this.state.forms}
                     nextStep={this.nextStep} 
                     prevStep={this.state.step != 0 ? this.prevFormStep : null}
                     step={step}
                  />
               )
            }
         </div>
      );
   }
}

export default AssignmentContract;
