import React, {Component} from 'react';
import {Droppable,Draggable} from "react-beautiful-dnd";
import './Column.css';
import Task from "./Task";

class InnerList extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.tasks===this.props.tasks){
            return false;
        }
        return true;
    }
    render(){
        return this.props.tasks.map((task,index) => (<Task key={task.id} task={task} index={index}/>))
    }
}


class Column extends Component {
    render() {
        return (
            <Draggable
            draggableId={this.props.column.id}
            index={this.props.index}
            >
               {(provided)=>( <div className={'Columncontainer'} {...provided.draggableProps} ref={provided.innerRef}>
                <h3 className={'title'} {...provided.dragHandleProps}>{this.props.column.title}</h3>
                <Droppable
                    droppableId={this.props.column.id}
                    type={"tasks"}
                >
                    {(provided) =>
                        (
                            <div className={'tasklist'}
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                        >
                            <InnerList tasks={this.props.tasks}/>
                                {provided.placeholder}
                        </div>)
                    }
                </Droppable>
            </div>)}
            </Draggable>
        );
    }
}

export default Column;