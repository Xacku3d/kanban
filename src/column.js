import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './task';
import AddNewTask from './addNewTask';

const Container = styled.div`   
    margin: 8px;
    font-family: 'Noto Sans KR', sans-serif;
    width: 220px;
    display: flex;
    flex-direction: column;
    color: #6C756B;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const Title = styled.h3`
    margin: 0px;
    padding: 8px;
    background-color: #094074;
    color: #F2F4FF;
`;

const TaskList = styled.div`
    padding: 8px;
    padding-bottom: 0px;
    background-color: ${props => (props.isDraggingOver ? '#EEFFB7' : 'white')};
    flex-grow: 1;
    min-height: 50px;
`;

export default class Column extends React.Component {
    onNewTask = task => {
        this.props.updateColumnsState(this.props.column.id, task)
    }

    render() {
        return (
            <div>
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable
                droppableId={this.props.column.id}
                >
                    {(provided, snapshot) => (
                        <TaskList
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                        >
                        {this.props.tasks.map((task, index) => {return <Task key={task.id} task={task} index={index} />})}
                        {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
            <AddNewTask onNewTask={this.onNewTask}/>
            </div>
        )
    }
}
