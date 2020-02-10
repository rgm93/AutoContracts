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
import activeTransactionsMockup from "../../ActiveTransactions/json/activeTransactionsMockup"
import "../styles/Transaction.css"

class Participants extends React.Component {
    state = {
        participants: []
    }
    componentDidMount() {
        console.log('id', this.props.id)
        let a = activeTransactionsMockup.activeTransactions.find(a => a.id == this.props.id)
        console.log('wgrwgy5', a)
        this.setState({ participants: a.data.participants.arrayOfConditionals })
    }
    render(){
        const { classes } = this.props;
        const { participants } = this.state
        return (
            <div>
                <GridContainer>
                {participants.map((p, i) => (
                    <GridItem xs={12} sm={12} md={6}>
                        <Card key={i} pricing>
                            <CardBody pricing>
                                <h6 className={classes.cardCategory}>
                                    Empresa
                                </h6>
                                <p>{p.Empresa}</p>
                                <h6 className={classes.cardCategory}>
                                    Título
                                </h6>
                                <p>{p.Titulo}</p>
                                <h3
                                    className={`${classes.cardTitle} ${classes.marginTop30}`}
                                />
                                <h6 className={classes.cardCategory}>
                                    Usuarios
                                </h6>
                                {
                                    p.Usuarios.arrayOfConditionals.map((u, j) => (
                                        <p key={j}>
                                            {u.Email}
                                        </p>
                                    ))
                                }
                            </CardBody>
                        </Card>
                  </GridItem>
                ))}
            </GridContainer>
            </div>
        )
    }
}

Participants.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
export default withStyles(dashboardStyle)(Participants);