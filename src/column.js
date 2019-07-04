import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './task';

const Container = styled.div`   
    margin: 8px;
    font-family: 'Noto Sans KR', sans-serif;
    width: 220px;
    display: flex;
    flex-direction: column;
    color: #6C756B;
    background-color: #F2F4FF;
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
    background-color: ${props => (props.isDraggingOver ? '#EEFFB7' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

export default class Column extends React.Component {
    render() {
        return (
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
                        {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                        {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}
