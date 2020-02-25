import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import transactionMockup from "../json/transactionMockup"
import "../styles/Transaction.css"

class Transaction extends React.Component {
  state = {
    contracts: []
  };
  componentDidMount() {
    console.log("tc", transactionMockup);
    // Método GET API para obtención de operaciones activas
    /*if (this.props.transaction != null) {
      this.setState({
        transactions: [...this.state.transactions, this.props.transaction]
      });
    }*/
    this.setState({contracts: transactionMockup.contracts})
  }
  newContract = () => {
    console.log("click");
  };

  getTransactionState = state => {
    let s = "";
    switch (state) {
      case "pending":
        s = "Pendiente";
        break;
      case "created":
        s = "Creado";
        break;
      case "ready":
        s = "Listo para firmar";
        break;
      case "completed":
        s = "Firmado";
        break;
      default:
        s = "Pendiente";
        break;
    }
    return s;
  };
  getTransactionStateButton = state => {
    let s = "";
    switch (state) {
      case "pending": s = "Pendiente de crear"; break;
      case "created": s = "Comenzar operación"; break;
      case "ready": s = "Ver operación"; break;
      case "completed": s = "Firmado"; break;
      default: s = "Pendiente"; break;
    }
    return s;
  };
  render() {
    const { classes } = this.props;
    const { contracts } = this.state;
    console.log("myTransactionsState", contracts);
    console.log(
      "prueba",
      contracts.map((t, i) => t.data.nameContract.value)
    );
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} lg={6}>
                <Card pricing>
                  <CardBody pricing>
                    <div className={classes.icon}>
                      <Icon>add_circle_outline</Icon>
                    </div>
                    <h3
                      className={`${classes.cardTitle} ${classes.marginTop60}`}
                    />
                    <NavLink to={"/admin/assignmentContract"}>
                      <Button round color="primary" className="buttonAddContract">
                        Nuevo Contrato
                      </Button>
                    </NavLink>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} lg={6}>
                <Card pricing>
                  <CardBody pricing>
                    <div className={classes.icon}>
                      <Icon>control_point_duplicate</Icon>
                    </div>
                    <h3
                      className={`${classes.cardTitle} ${classes.marginTop60}`}
                    />
                    <NavLink to={"/admin/wordContract"}>
                      <Button round color="primary" className="buttonAddContract">
                        Subir Contrato
                      </Button>
                    </NavLink>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <hr style={{ color: "black", backgroundColor: "black", height: 1 }} />
            <GridContainer>
                {contracts.map((c, i) => (
                    <GridItem key={i} xs={12} sm={6} md={3}>
                        <Card pricing>
                            <CardBody pricing>
                            <h6 className={classes.cardCategory}>
                                {c.data.nameContract.value}
                            </h6>
                            <div className={classes.icon}>
                                <Icon style={{ margin: 5 }}>transform</Icon>
                            </div>
                            <h3
                                className={`${classes.cardTitle} ${classes.marginTop30}`}
                            />
                            <p className={classes.cardDescription}>
                                Estado: {this.getTransactionState(c.data.state)}
                            </p>
                            <div className="transaction">
                                <div style={{margin: 15}}>
                                    <NavLink to={`/admin/assignmentContract/${c.id}`}>
                                        <Icon color="primary">remove_red_eye</Icon>
                                    </NavLink>
                                </div>
                                <div style={{margin: 15}}>
                                    <NavLink to={`/admin/assignmentContract/${c.id}`}>
                                        <Icon color="secondary">edit</Icon>
                                    </NavLink>
                                </div>
                                <div style={{margin: 15}}>
                                    <NavLink to={`/admin/assignmentContract/${c.id}`}>
                                        <Icon color="action">send</Icon>
                                    </NavLink>
                                </div>
                            </div>
                            
                            {/*<NavLink to={"/admin/assignmentContract"}>
                                <Button round color="primary">
                                {this.getTransactionStateButton(c.data.state)}
                                </Button>
                             </NavLink>*/}
                            </CardBody>
                        </Card>
                  </GridItem>
                ))}
            </GridContainer>
      </div>
    );
  }
}

Transaction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Transaction);
