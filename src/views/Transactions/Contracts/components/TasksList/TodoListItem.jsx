import React from "react";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { green, yellow, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);
const YellowRadio = withStyles({
    root: {
      color: yellow[400],
      '&$checked': {
        color: yellow[600],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);
const RedRadio = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

export default class TodoListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isEditing: false,
            selectedState: this.props.stateTask
        };
    }
    renderActionSection () {
        if (this.state.isEditing) {
            return (
                <td style={{display: "flex"}}>
                    <button onClick={this.editTask.bind(this)}><CheckCircle /></button>
                    <button className="cancel-btn" onClick={this.setEditState.bind(this, false)}><Cancel /></button>
                </td>
            );
        }
        return (
            <div>
                <td style={{display: "flex"}}>
                    <button onClick={this.setEditState.bind(this, true)}><Edit /></button>
                    <button className="delete-btn" onClick={this.deleteTask.bind(this)}><Delete /></button>
                </td>
            </div>
            
        );
    }

    renderTask () {
        const { task /*, isCompleted*/ } = this.props;
        const taskStyle = {
            cursor: "pointer",
            fontSize: "medium",
            paddingRight: "5%",
            textAlign: "start",
            paddingLeft: "3%"
        };

        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.editTask.bind(this)}>
                        <input ref="task" defaultValue={task} autoFocus />
                    </form>
                </td>
            );
        }

        return (
            <td onClick={this.toggleTask.bind(this)} style={taskStyle}>{task}</td>
        );
    }

    render () {
        const { isCompleted } = this.props;
        const { isEditing } = this.state
        return (
            <div>
                <tr className={"todo-" + (isCompleted ? "completed" : "not-completed") }>
                    {this.renderTask()}
                    {this.renderActionSection()}
                </tr>
                {
                    !isEditing ? (
                        <td style={{display: "flex", justifyContent: "center"}}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="position" name="states" value={this.state.selectedState} onChange={this.stateTask} row>
                                    <FormControlLabel
                                        value="started"
                                        control={
                                            <RedRadio
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'S' }}
                                            />
                                        }
                                        label={<span style={{ fontSize: '0.7rem', color: 'black' }}>{"Por empezar"}</span>}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="processed"
                                        control={
                                            <YellowRadio
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'P' }}
                                            />
                                        }
                                        label={<span style={{ fontSize: '0.7rem', color: 'black' }}>{"En proceso"}</span>}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="finished"
                                        control={
                                            <GreenRadio
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'F' }}
                                            />
                                        }
                                        label={<span style={{ fontSize: '0.7rem', color: 'black' }}>{"Terminado"}</span>}
                                        labelPlacement="start"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </td>
                    ) : null 
                }
            </div>
        )
    }

    setEditState (isEditing) {
        this.setState({
            isEditing
        });
    }

    stateTask = event => {
        this.setState({selectedState: event.target.value})
        this.props.stateTask(this.props.id, event.target.value)
    }

    toggleTask () {
        this.props.toggleTask(this.props.id);
    }

    editTask (e) {
        this.props.editTask(this.props.id, this.refs.task.value);
        this.setState({
            isEditing: false
        });
        e.preventDefault();
    }

    deleteTask () {
        this.props.deleteTask(this.props.id);
    }
}