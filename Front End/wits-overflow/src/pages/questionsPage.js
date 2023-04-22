// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
import QuestionRow2 from '../components/QuestionRow2';
import QuestionRow3 from '../components/QuestionRow3';
import QuestionRow4 from '../components/QuestionRow4';
import QuestionRow5 from '../components/QuestionRow5';
import StyledButton from '../components/styledButton';
import Question from '../components/Question';
// import Question from '../components/Question';
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
    
    let questionID1 = 0;
    let questionTitle1 = "Conditional joining of dataframes";
    let questionText1 = "Howdy partner :)";
    let votes1 = 0;
    let answerCount1 = 0;
    let viewCount1 = 4;
    let timeAsked1 = "3 min ago";
    let firstName1 = "Jordan";
    let tags1 = ["a", "b", "c", "d"];

    let questionID2 = 1;
    let questionTitle2 = "How to find similarity between two vectors?";
    let questionText2 = "Howdy partner :)";
    let votes2 = 1;
    let answerCount2 = 0;
    let viewCount2 = 5;
    let timeAsked2 = "5 min ago";
    let firstName2 = "Ndivhuwo";
    let tags2 = ["python", "vector", "pytorch", "similarity"];

    let questionID3 = 2;
    let questionTitle3 = "Spring stub returns incorrect response on GET endp with different number of parameters sent";
    let questionText3 = "Howdy partner :)";
    let votes3 = 0;
    let answerCount3 = 1;
    let viewCount3 = 0;
    let timeAsked3 = "17 min ago";
    let firstName3 = "Troy";
    let tags3 = ["python", "vector", "spring", "spring-cloud"];


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
            <QuestionRow
                questionID = {questionID1}
                questionTitle = {questionTitle1}
                questionText = {questionText1}
                votes = {votes1} 
                answerCount = {answerCount1}
                viewCount = {viewCount1}
                timeAsked = {timeAsked1}
                firstName = {firstName1}
                tags = {tags1}
            />
            <QuestionRow
                questionID = {questionID2}
                questionTitle = {questionTitle2}
                questionText = {questionText2}
                votes = {votes2} 
                answerCount = {answerCount2}
                viewCount = {viewCount2}
                timeAsked = {timeAsked2}
                firstName = {firstName2}
                tags = {tags2}
            />
            <QuestionRow
                questionID = {questionID3}
                questionTitle = {questionTitle3}
                questionText = {questionText3}
                votes = {votes3} 
                answerCount = {answerCount3}
                viewCount = {viewCount3}
                timeAsked = {timeAsked3}
                firstName = {firstName3}
                tags = {tags3}
            />
        </main>
    );
}

export default QuestionsPage;