import React from "react";
import TodosList from "./TodoList"
import CreateTodo from "./CreateTodo";
import css from "./style.css";

const todos = {
    items: [],
    lsKey: "todos",
    populate () {
        this.items = this.get();
    },
    get () {
        /*try {
            let a = JSON.parse(localStorage.getItem(this.lsKey)) || []
            console.log('aaaaa', a)
            return a
        } catch (e) {}
        return [];*/
        return []
    },
    save () {
        //localStorage.setItem(this.lsKey, JSON.stringify(this.items));
    },
    state (id, state) {
        let todoItem = this.items[id];
        todoItem.state = state;
        this.save();
    },
    toggle (id) {
        let todoItem = this.items[id];
        todoItem.isCompleted = !todoItem.isCompleted;
        this.save();
    },
    add (obj) {
        this.items.push(obj);
        this.save();
    },
    remove (id) {
        this.items.splice(id, 1);
        this.save();
    },
    update (id, task) {
        let todoItem = this.items[id];
        todoItem.task = task;
        this.save();
    }
};

todos.populate();


export default class TasksList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            todos: todos.items
        };
    }
    componentDidMount() {
        console.log('propsTaskListComponent', this.props.data)
        
        this.props.data.tasks.map((t) => {
            this.createTaskWith(t)
        })
        //this.setState({todos: this.props.data.tasks})
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.items !== prevState.items) {
            return { todos: nextProps.items}
        }
        return null
    }
    render () {
        console.log('todos', this.state.todos)
        console.log('props', this.props.data)
        return (
            <div style={{height: "50px"}}>
                <div className="listName">
                    {this.props.data.name}
                </div>
                <CreateTodo
                    createTask={this.createTask.bind(this)}
                />
                <div style={{height: "240px", overflow: "auto", border: "1px solid grey"}}>
                    <TodosList
                    todos={this.state.todos}
                    stateTask={this.stateTask.bind(this)}
                    toggleTask={this.toggleTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
                </div>
                
            </div>
        );
    }

    createTask (task) {
        task = task.trim();
        if (!task) { return; }
        todos.add({
            task,
            isCompleted: false,
            state: ''
        });
        this.setState({ todos: this.state.todos });
        //this.props.setData(this.state.todos)
    }
    createTaskWith (obj) {
        let task = obj.task.trim();
        if (!task) { return; }
        todos.add({
            task,
            isCompleted: obj.isCompleted,
            state: obj.state
        });
        this.setState({ todos: this.state.todos });
        //this.props.setData(this.state.todos)
    }
    stateTask (taskId, state) {
        todos.state(taskId, state);
        this.setState({ todos: this.state.todos });
        //this.props.setData(this.state.todos)
    }
    toggleTask (taskId) {
        todos.toggle(taskId);
        this.setState({ todos: this.state.todos });
        //this.props.setData(this.state.todos)
    }
    editTask (taskId, task) {
        todos.update(taskId, task);
        this.setState({ todos: this.state.todos });
        //this.props.setData(this.state.todos)
    }
    deleteTask (taskId) {
        todos.remove(taskId);
        this.setState({ todos: this.state.todos });
        //this.props.setData(this.state.todos)
    }
}