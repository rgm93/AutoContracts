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
import activeTransactionsMockup from "../json/activeTransactionsMockup"

class ActiveTransactions extends React.Component {
  state = {
    transactions: [],
    value: 0
  };
  componentDidMount() {
    console.log("props", this.props.transaction);
    // Método GET API para obtención de operaciones activas
    /*if (this.props.transaction != null) {
      this.setState({
        transactions: [...this.state.transactions, this.props.transaction]
      });
    }*/
    if (this.props.transaction != undefined) {
      this.setState({
        transactions: [
          ...this.state.transactions,
          this.props.transaction
        ]
      })
    } 
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
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
    const { transactions } = this.state;
    console.log("myTransactionsState", transactions);
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
                    <NavLink to={"/admin/newOperation"}>
                      <Button round color="primary">
                        Nueva Operación
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
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} lg={6}>
                {transactions != undefined && transactions.map((t, i) => (
                  <Card key={i} pricing>
                    <CardBody key={i} pricing>
                      <h6 className={classes.cardCategory}>
                        {t.data.nameTransaction.name}
                      </h6>
                      <div className={classes.icon}>
                        <Icon style={{ margin: 5 }}>transform</Icon>
                      </div>
                      <h3
                        className={`${classes.cardTitle} ${classes.marginTop30}`}
                      />
                      <p className={classes.cardDescription}>
                        Estado: {this.getTransactionState(t.state)}
                      </p>
                      <NavLink 
                        to={{
                          pathname: '/admin/transaction/',
                          search: `?id=${t.id}`,
                          name: t.data.nameTransaction.name
                        }}
                        
                        >
                        <Button round color="primary">
                          {this.getTransactionStateButton(t.state)}
                        </Button>
                      </NavLink>
                    </CardBody>
                  </Card>
                ))}
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ActiveTransactions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ActiveTransactions);
