import React, {useState} from 'react';
import styled from 'styled-components';

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

    if(isFocused) {
        document.body.addEventListener('click',(e) => {
            if(!(e.target.localName === 'input' || e.target.localName === 'button')) {
                setFocus(false);
            }
        });
    }

    const getCoulmnValue = () => {
        onNewColumn(document.getElementById('inputColumn').value);
        setFocus(false);
    }

    return (
        isFocused ?
        <Container isFocused={isFocused}>
                <Input  id='inputColumn' autoFocus placeholder="Enter the title" type="text"/><br/>
                <Button value="" onClick={getCoulmnValue}><b>+</b> &nbsp;&nbsp;Add new column</Button>
        </Container>
        :
        <Container isFocused={isFocused}>
            <div onClick={() => setFocus(true)}>
            &nbsp;<b>+</b> &nbsp;&nbsp;&nbsp;Add new column
            </div>
        </Container>
    )
}
