import React, {Component} from 'react';
import {Draggable} from "react-beautiful-dnd";

import classes from './Task.module.css'

class Task extends Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
            >
                {(provided,snapshot) => (
                    <div className={classes.container}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                        ref={provided.innerRef}

                    >
                        {this.props.task.content}
                    </div>)}
            </Draggable>
        );
    }
}

export default Task;