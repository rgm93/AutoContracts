import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import "../styles/Tasks.css";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import PDFContractViewer from "views/Transactions/Contracts/components/PDFContractViewer/PDFContractViewer";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TasksList from "views/Transactions/Contracts/components/TasksList/TasksList";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import {
  sendPreviewContract
  /*getPreviewContract*/
} from "views/Transactions/Contracts/functions/functionsContract.js";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import tasksListsMockup from "../json/tasksListsMockup.json";
import contractsIDMockup from "../json/contractsIDMockup.json";
import contractsMockup from "../json/contractsMockup";

class Tasks extends React.Component {
  state = {
    tasksLists: [], // [{id, name}]
    tList: {}, // { id, name, tasks: {text, state} }
    contracts: [], // [{ id, name }]
    contract: {}, // { id, name, type, state, parts, doc }
    createList: {
      isCreated: false,
      createListName: "",
      controlCreateList: "error"
    }
  };
  componentDidMount() {
    console.log("tc", tasksListsMockup);
    console.log("tt", this.state.tList);
    this.setState({
      contracts: contractsIDMockup.contractsID
    });
  }
  /*componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.tList !== this.state.tList) {
      this.setState({ tList: this.state.tList})
    }
  }*/
  getContractSelected = id => {
    console.log("id", id);
  };
  gettListSelected = (value) => {
    console.log("id", value);
    const tList = {
        id: value.id,
        name: value.name,
        tasks: value.tasks
    }
    this.setState({ tList: this.state.tasksLists[value.id] }); // en un futuro será con id de la lista

    console.log(this.state)
    /*try {
        this.setState({contract: getContractById(id)})
    } catch (e) {
        console.log('error', e)
    }*/
  };
  handleCreateList = e => {
    const existsName = this.state.tasksLists.find(
      t => t.name == e.target.value
    );
    if (!existsName) {
      this.setState({
        createList: {
          ...this.state.createList,
          createListName: e.target.value,
          controlCreateList: "success"
        }
      });
    }
  };
  createNewList = () => {
    if (this.state.createList.controlCreateList == "success") {
      const lastPos = this.state.tasksLists.length;
      console.log("las", lastPos);
      console.log('cc', this.state.createList.createListName)
      this.setState({
        tasksLists: [
          ...this.state.tasksLists,
          {
            id: lastPos,
            name: this.state.createList.createListName,
            tasks: []
          }
        ],
        tList: {
          id: lastPos,
          name: this.state.createList.createListName,
          tasks: []
        },
        createList: {
          ...this.state.createList,
          isCreated: false
        }
      });
      console.log("egesg", this.state.tasksLists);
    }
  };
  settList = tList => {
    console.log('tliflfl', tList)
    this.setState({ tList });
  };
  render() {
    const { classes } = this.props;
    console.log("state", this.state);
    const optionsContracts = this.state.contracts.map(option => {
      const firstLetter = option.name[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option
      };
    });
    const optionsLists = this.state.tasksLists.map(option => {
      const firstLetter = option.name[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option
      };
    });
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <div className="selectCenterContracts">
            <Autocomplete
              freeSolo
              id="combo-box-demo"
              options={optionsContracts.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={option => option.firstLetter}
              getOptionLabel={option => (option.name ? option.name : option)}
              style={{ width: 300 }}
              disableClearable
              onChange={(event, value) => this.getContractSelected(value.id)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Elige contrato a visualizar"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
          <PDFContractViewer
            data={/*this.getData()*/ "<h1>hola</h1>"}
            html={this.getHTML}
          />
        </div>

        <div style={{ width: "50%", margin: "0 3% 0 3%" }}>
          <div className="selectCenterLists">
            <Autocomplete
              freeSolo
              id="combo-box-demo"
              options={optionsLists.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={option => option.firstLetter}
              getOptionLabel={option => (option.name ? option.name : option)}
              style={{ width: 300 }}
              disableClearable
              onChange={(event, value) => this.gettListSelected(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Elige una lista de tareas"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Button
              round
              color="primary"
              onClick={() =>
                this.setState({
                  createList: { ...this.state.createList, isCreated: true }
                })
              }
              className="buttonAddList"
            >
               <Icon>add</Icon>
            </Button>
          </div>
          <div className="selectCenterNewList">
            {this.state.createList.isCreated ? (
              <form className="createListForm">
                <CustomInput
                  success={
                    this.state.createList.controlCreateList === "success"
                  }
                  error={this.state.createList.controlCreateList === "error"}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  id="createList"
                  inputProps={{
                    onChange: event => this.handleCreateList(event),
                    type: "string",
                    value: this.state.createList.createListName,
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <Icon className={classes.inputAdornmentIcon}>
                          person
                        </Icon>
                      </InputAdornment>
                    ),
                    placeholder: "Nombre de la lista"
                  }}
                />
                <div className="centerButtons">
                  <Button
                    round
                    color="primary"
                    disabled={this.state.createList.createListName == ""}
                    onClick={() => this.createNewList()}
                  >
                    Añadir
                  </Button>
                  <Button
                    round
                    color="secondary"
                    onClick={() =>
                      this.setState({
                        createList: {
                          ...this.state.createList,
                          isCreated: false
                        }
                      })
                    }
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <div style={{ padding: "0% 5% 30% 5%", display: "block" }}>
                <div className="selCenter">
                  {this.state.tList.name != undefined? (
                    <TasksList data={this.state.tList} />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Tasks);
