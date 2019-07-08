import React, { Component } from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 0px;
    border: 1px solid ${props => (props.isDragging ? '#094074' : 'lightgray')};
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#A5D328' : 'white')};
    color: ${props => (props.isDragging ? '#FFFFFC' : 'black')};
    box-shadow: 0 0 10px rgba(0,0,0,${props => (props.isDragging ? '0.5' : '0')});
    word-wrap: break-word;
`;

export default class Task extends Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}
