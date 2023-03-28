// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
import QuestionRow2 from '../components/QuestionRow2';
import QuestionRow3 from '../components/QuestionRow3';
import QuestionRow4 from '../components/QuestionRow4';
import QuestionRow5 from '../components/QuestionRow5';
import StyledButton from '../components/styledButton';
import {Link, useNavigate} from "react-router-dom";

const StyledHeader = styled.h1`
    font-size: 1.5rem;
    color: #000;
    font-weight:bold;
    padding: 10px 0;
`;

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 1fr min-content;
    padding: 10px 20px;
`;


function QuestionsPage(){
    let navigate = useNavigate();
    const routeChange = () => {
        let path= '/askPage';
        navigate(path);
    }
    return (
        <main>
            <HeaderRow>
                <StyledHeader> Top Questions </StyledHeader>
                <StyledButton onClick={routeChange}> Ask&nbsp;Question </StyledButton>
            </HeaderRow>
            <QuestionRow/>
            <QuestionRow2/>
            <QuestionRow3/>
            <QuestionRow4/>
            <QuestionRow5/>
        </main>
    );
}

export default QuestionsPage;