import React from "react";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel"

export default class TodoListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isEditing: false
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
            <td style={{display: "flex"}}>
                <button onClick={this.setEditState.bind(this, true)}><Edit /></button>
                <button className="delete-btn" onClick={this.deleteTask.bind(this)}><Delete /></button>
            </td>
        );
    }

    renderTask () {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            cursor: "pointer",
            fontSize: "medium",
            paddingRight: "5%"
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
        return (
            <tr className={"todo-" + (isCompleted ? "completed" : "not-completed") }>
                {this.renderTask()}
                {this.renderActionSection()}
            </tr>
        )
    }

    setEditState (isEditing) {
        this.setState({
            isEditing
        });
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