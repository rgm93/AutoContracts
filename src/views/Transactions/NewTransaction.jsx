import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import routes from "routes.js";

import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class NewTransaction extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  newContract = () => {
    console.log("click")
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} lg={6}>
                <Card pricing>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>CONTRATO DE CESIÓN</h6>
                    <h6 classes={{marginTop: 30}} />
                    <div className={classes.icon}>
                      <Icon>assignment</Icon>
                    </div>
                    <h3
                      className={`${classes.cardTitle} ${classes.marginTop30}`}
                    >
                    
                    </h3>
                    <p className={classes.cardDescription}>
                      Gestiona y realiza un contrato de cesión
                    </p>
                    <h6 classes={{marginTop: 30}} />
                    <NavLink
                      to={"/admin/assignmentContract"}
                    >
                      <Button round color="primary">
                        Realizar contrato
                      </Button>
                    </NavLink>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

NewTransaction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(NewTransaction);
