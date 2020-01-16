import React from "react";
import PropTypes from "prop-types";

import Form from "react-jsonschema-form";
import "views/Transactions/Contracts/AssignmentContract/contract/AssignmentContract.css";
import uischema from "views/Transactions/Contracts/AssignmentContract/json/uiSchema.json"
import formdata from 'views/Transactions/Contracts/AssignmentContract/json/formData.json';

class AssignmentContractPreviewSteps extends React.Component {
   constructor(props) {
      super(props)
      this.state = { form: null, filledForm: false }
   }

   getFormData(formData) {
      this.setState({ form: formData, filledForm: true });
      this.next(formData);
   }

   next = (formData) => {
      if (this.props.formSaved == null) this.props.handleChangePreview(formData)
   }

   fillSchema = (schema) => {
      return schema.form.transferee.email = this.props.entities.transferee.email;
   }

   render() {
      const schema = this.props.contract
      const onSubmit = ({formData}, e) => this.getFormData(formData, e);
      
      return (
         <div>
            <Form 
               className="inputForm"
               schema={schema}
               uiSchema={uischema}
               onSubmit={onSubmit}
            >
               <div className="buttons">
                  <button type="submit" className="buttonSteps">Comenzar</button> 
               </div>
            </Form>
         </div>
      );
   }
}

export default AssignmentContractPreviewSteps;
