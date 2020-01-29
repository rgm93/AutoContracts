import React from "react";

export default class TodoListHeader extends React.Component {
    render () {
            return (
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Acción</th>
                    </tr>
                </thead>
            )
    }
}