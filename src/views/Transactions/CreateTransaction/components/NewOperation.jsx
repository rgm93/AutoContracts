import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import Form from "react-jsonschema-form";
import "../styles/NewTransactions.css";
import uischema from "../json/uiSchema.json";
import transactionForm from "../json/transactionForm.json";
import { verifyEmail } from "views/Pages/Register/functions/functionsRegister"
import NewTransaction from "../../Transaction/components/NewTransaction";
import ActiveTransactions from "../../ActiveTransactions/components/ActiveTransactions"

class NewOperation extends React.Component {
  state = {
    transactionForm: {
      data: null,
      state: 'pending'
    },
    filledForm: false,
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  newContract = () => {
    console.log("click");
  };

  handleFormData = (formData) => {
    const participants = formData.form.participants.arrayOfConditionals
    if (formData.form.nameTransaction.name !== "" && participants.length > 1 && this.checkParticipants(participants)) {
        return true
    }
    return false
  }

  getFormData(formData) {
    if (this.handleFormData(formData)) {
        this.setState({ 
            transactionForm: {
                ...this.state.transactionForm,
                data: formData.form, 
                state: 'created'
            },
            filledForm: true 
        })
    } else return false
  }
  checkParticipants(participants) {
    return participants.length > 0 && participants.map(p => verifyEmail(p['Email'])).every(e => e == true)
  }
  render() {
    const { filledForm } = this.state
    const onSubmit = ({formData}, e) => this.getFormData(formData, e);
    const handleParticipants = ({formData}, e) => this.checkParticipants(formData, e)
    return (
        <div>
          {!filledForm ? (
            <GridContainer>
            <Form
                className="inputForm"
                schema={transactionForm}
                uiSchema={uischema}
                onChange={handleParticipants}
                onSubmit={onSubmit}
            >
                <div className="buttons">
                <button type="submit" className="buttonSteps">
                    Crear Operación
                </button>
                </div>
            </Form>
            </GridContainer>
          ) : (
              this.props.history.push(
                {
                  pathname: '/admin/transaction/',
                  search: `?id=${0}`,
                  name: this.state.transactionForm.data != null ? this.state.transactionForm.data.nameTransaction.name : ''
                }
              )
          )}
        </div>
    );
  }
}

NewOperation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(NewOperation);
