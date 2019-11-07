import React from "react";
import PropTypes from "prop-types";

import Form from "react-jsonschema-form";
import "views/Transactions/Contracts/AssignmentContract/contract/AssignmentContract.css";
import uischema from "views/Transactions/Contracts/AssignmentContract/json/uiSchema.json"
import formdata from 'views/Transactions/Contracts/AssignmentContract/json/formData.json';
import PDFContract from 'views/Transactions/Contracts/AssignmentContract/PDFContract';

class AssignmentContractSteps extends React.Component {
   constructor(props) {
      super(props)
      this.state = { form: null, filledForm: false }
   }

   getFormData(formData) {
      this.setState({ form: formData, filledForm: true });
      this.next(formData);
   }

   next = (formData) => {
      if (this.props.formSaved == null) this.props.handleChange(formData)
      this.props.nextStep()
   }

   back  = (e) => {
      e.preventDefault();
      this.props.prevStep();
   }

   render() {
      const schema = this.props.contract;
      console.log('schema', schema)
      const onSubmit = ({formData}, e) => this.getFormData(formData, e);
      const log = (type) => console.log.bind(console, type);
      
      return (
         <div>
            <Form 
               className="inputForm"
               schema={schema}
               uiSchema={uischema}
               formData={this.props.formSaved != null ? this.props.formSaved : formdata}
               onSubmit={onSubmit}
            >
               <div className="buttons">
                  { this.props.step !== 0 ? 
                     (
                        <button className="buttonStepsBack" onClick={this.back}>Atrás</button>
                     ) : null 
                  }
                  <button type="submit" className="buttonSteps">Siguiente</button> 
               </div>
            </Form>
         </div>
      );
   }
}

AssignmentContractSteps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default AssignmentContractSteps;
