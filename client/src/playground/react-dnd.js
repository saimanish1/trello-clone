import React, {Component, PureComponent} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import './react-dnd.css';
import initialData from "./initial-data";
import Column from "./Column";

class InnerList extends Component{

    render(){
        const {column,taskMap,index}=this.props;
        const tasks=column.taskIds.map(taskId=>taskMap[taskId]);
        return <Column column={column} tasks={tasks} index={index}/>
    }
}

class ReactDnd extends Component {
    state = initialData;
    onDragEnd = result => {

        const {destination, source, draggableId,type} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.id) {
            return;
        }

        if(type==='column'){
            const newColumnOrder=Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index,1);
            newColumnOrder.splice(destination.index,0,draggableId);

            const newState={
                ...this.state,
                columnOrder:newColumnOrder
            };
            this.setState(newState);
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        if (start === finish) {

            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };
            this.setState(newState);
            return;
        }
        // Moving from one list to another list
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        this.setState(newState);


    };

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable
                droppableId='all-columns'
                direction={"horizontal"}
                type={"column"}
                >
                    {(provided)=>(<div className={"reactdndcontainer"} {...provided.droppableProps} ref={provided.innerRef}>
                        {this.state.columnOrder.map((columnId,index) => {
                            const column = this.state.columns[columnId];


                            return <InnerList key={column.id} column={column} taskMap={this.state.tasks} index={index}/>
                        })}
                        {provided.placeholder}
                    </div>)}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default ReactDnd;