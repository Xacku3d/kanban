import React, {useState} from 'react'
import styled from 'styled-components';

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

const Input = styled.input`
    width: 191px;
    height: 25px;
    padding-left: 5px;
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
    
    if(isFocused) {
        document.body.addEventListener('click',(e) => {
            if(!(e.target.localName === 'input' || e.target.localName === 'button')) {
                setFocus(false);
            }
        });
    }

    const getTaskValue = () => {
        onNewTask(document.getElementById('inputTask').value);
        setFocus(false);
    }

    return (
        isFocused ?
        <Container isFocused={isFocused}>
                <Input  id='inputTask' autoFocus placeholder="Enter the title" type="text"/><br/>
                <Button value="" onClick={getTaskValue}><b>+</b>&nbsp;&nbsp;Add new task</Button>
        </Container>
        :
        <Container isFocused={isFocused} onClick={() => setFocus(true)}>
            &nbsp;<b>+</b> &nbsp;&nbsp;&nbsp;Add new task
        </Container>
    )
}
