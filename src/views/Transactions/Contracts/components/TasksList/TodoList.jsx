import React from "react";
//import TodosListHeader from "./TodoListHeader";
import TodosListItem from "./TodoListItem";

export default class TodoList extends React.Component {
    renderItems () {
        return this.props.todos.map((c, index) => {
            return (
                <div style={{
                    borderBottom: "1px solid grey",
                    padding: 5,
                    margin: 10
                }}>
                    <TodosListItem
                        key={index}
                        {...c}
                        id={index}
                        stateTask={this.props.stateTask}
                        toggleTask={this.props.toggleTask}
                        editTask={this.props.editTask}
                        deleteTask={this.props.deleteTask}
                    />
                </div>
                
            )
        });
    }
    render () {
        if (!this.props.todos.length) {
            return <p className="tutorial">Añade una tarea</p>;
        }
        return (
            <table>
                {/* <TodosListHeader /> */}
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        )
    }
}