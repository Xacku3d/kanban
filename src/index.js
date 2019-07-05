import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import AddNewColumn from './addNewColumn';

document.body.style.backgroundColor = '#D0E0EF'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
`
class App extends React.Component {
    state = initialData;

    onNewColumn = title => {
        const newColumn = {
            id: `column-${Object.keys(this.state.columns).length+1}`,
            title: title,
            taskIds: []
        };
        this.state.columns[newColumn.id] = newColumn;
        this.state.columnOrder.push(newColumn.id);
        this.setState(this.state);
    }

    updateColumnsState = (columnID, task) => {
        const newTask = {
            id: `task-${Object.keys(this.state.tasks).length+1}`,
            content: task
        };
       this.state.columns[columnID].taskIds.push(newTask.id);
       this.state.tasks[newTask.id] = newTask;
       this.setState(this.state);
    }

    onDragEnd = result => {

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                }
            }
    
            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };
        
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }

        this.setState(newState);
    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Container>
                    {this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={tasks} updateColumnsState={this.updateColumnsState}/>
                    })}
                    <AddNewColumn onNewColumn={this.onNewColumn} />
                </Container>
            </DragDropContext>
        )
    }
}

ReactDOM.render(<App className='app' />, document.getElementById('root'));
