import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import useComponentFocus from './useComponentFocus';

const Container = styled.div`   
    padding: 8px;
    margin: 8px;
    font-family: 'Noto Sans KR', sans-serif;
    width: 220px;
    height: ${props => props.isFocused ? '65px' : '30px'};
    border: solid 2px #A5D328;
    cursor: pointer;
    background-color: #094074;
    color: #F2F4FF;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const Input = styled.input`
    width: 206px;
    height: 25px;
    padding-left: 5px;
`

const Button = styled.button`
    font-size: 17px;
    cursor: pointer;
    margin-top: 5px;
    width: 215px;
    border: 0px;
    height: 29px;
    background-color: #A5D328;
    color: #FFFFFC;
    paddinf-left: 0px;
`

export default function AddNewColumn({onNewColumn}) {
    const [isFocused, setFocus] = useState(false);

    const node = useRef();
    useComponentFocus(node, () => {setFocus(false)});

    const getCoulmnValue = () => {
        onNewColumn(document.getElementById('inputColumn').value);
        setFocus(false);
    }

    return (
        isFocused ?
        <Container ref={node} isFocused={isFocused}>
                <Input  id='inputColumn' autoFocus placeholder="Enter the title" type="text"/><br/>
                <Button value="" onClick={getCoulmnValue}><b>+</b> &nbsp;&nbsp;Add new column</Button>
        </Container>
        :
        <Container ref={node} isFocused={isFocused} onClick={() => setFocus(true)}>
            <div>
            &nbsp;<b>+</b> &nbsp;&nbsp;&nbsp;Add new column
            </div>
        </Container>
    )
}
