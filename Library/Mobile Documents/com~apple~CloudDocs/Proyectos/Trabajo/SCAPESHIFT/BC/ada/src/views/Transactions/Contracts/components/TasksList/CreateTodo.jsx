import React from "react";
import Add from "@material-ui/icons/Add";

export default class CreateTodo extends React.Component {
    render () {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className="create-todo-form">
                <input type="text" placeholder="Nueva tarea" ref="taskMessage" autoFocus/>
                <button><Add /></button>
            </form>
        );
    }
    onSubmit = e => {
        this.props.createTask(this.refs.taskMessage.value);
        this.refs.taskMessage.value = "";
        e.preventDefault();
    }
}