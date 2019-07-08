import React, {useState, useRef} from 'react'
import styled from 'styled-components';
import useComponentFocus from './useComponentFocus';

const Container = styled.div`
    margin: 8px;
    border: 2px solid #A5D328;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
    color: black;
    box-shadow: 0 0 1px rgba(0,0,0,0.1);
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
`;

const Input = styled.textarea`
    width: 191px;
    height: 25px;
    padding-left: 5px;
    resize: none;
`

const Button = styled.button`
    font-size: 17px;
    cursor: pointer;
    margin-top: 5px;
    width: 200px;
    border: 0px;
    height: 29px;
    background-color: #A5D328;
    color: #FFFFFC;
    paddinf-left: 0px;
`

export default function AddNewTask({onNewTask}) {
    const [isFocused, setFocus] = useState(false);
    
    const node = useRef();
    useComponentFocus(node, () => {setFocus(false)});

    const getTaskValue = () => {
        const value = document.getElementById('inputTask').value;
        if(value.trim().length === 0) {return;}
        onNewTask(value);
        setFocus(false);
    }

    const onInputKeyDown = (e) => {
        const {key, shiftKey} = e;
        if(shiftKey && key === 'Enter') {return;}
        if(key === 'Enter') {getTaskValue()}
        if(key === 'Escape') {setFocus(false)}
    }

    return (
        isFocused ?
        <Container ref={node} isFocused={isFocused}>
                <Input onKeyDown={onInputKeyDown}  id='inputTask' autoFocus placeholder="Enter the title" type="text"/><br/>
                <Button value="" onClick={getTaskValue}><b>+</b>&nbsp;&nbsp;Add new task</Button>
        </Container>
        :
        <Container ref={node} isFocused={isFocused} onClick={() => setFocus(true)}>
            &nbsp;<b>+</b> &nbsp;&nbsp;&nbsp;Add new task
        </Container>
    )
}
