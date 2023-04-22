// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
// import QuestionRow2 from '../components/QuestionRow2';
// import QuestionRow3 from '../components/QuestionRow3';
// import QuestionRow4 from '../components/QuestionRow4';
// import QuestionRow5 from '../components/QuestionRow5';
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


//dummy data to use to populate questions page. Stored as an array to ensure conciseness
let questionIDs = [0, 1, 2];
let questionTitles = ["Conditional joining of dataframes", "How to find similarity between two vectors?","Spring stub returns incorrect response on GET endp with different number of parameters sent"];
let questionTexts = ["Howdy partner 1", "Howdy partner 2", "Howdy partner 3"];
let voteCounts = [0, 1, 0];
let answerCounts = [0, 1, 0];
let viewCounts = [4, 5, 2];
let timesAsked = ["3 min ago", "1 hr ago", "17 min ago"];
let firstNames = ["Jordan", "Ndivhuwo", "Troy"];
let postTags = [["a", "b", "c", "d"], ["python", "vector", "pytorch", "similarity"], ["python", "vector", "spring", "spring-cloud"]];


function QuestionsPage(){
    let navigate = useNavigate();

    //in future, we use firebase to populate each of these arrays
    const routeChangeToAskQuestion = () => {
        let path= '/askPage';
        navigate(path);
    }

    const routeChangeToSingleQuestion = () => {
        let path = '/question';
        console.log("Clicked on question");
        navigate(path);
    }

    return (
        <main>
            <HeaderRow>
                <StyledHeader> Top Questions </StyledHeader>
                <StyledButton onClick={routeChangeToAskQuestion}> Ask&nbsp;Question </StyledButton>
            </HeaderRow>
            <QuestionRow 
                questionID = {questionIDs[0]}
                questionTitle = {questionTitles[0]}
                questionText = {questionTexts[0]}
                votes = {voteCounts[0]} 
                answerCount = {answerCounts[0]}
                viewCount = {viewCounts[0]}
                timeAsked = {timesAsked[0]}
                firstName = {firstNames[0]}
                tags = {postTags[0]}
            />
            <QuestionRow
                questionID = {questionIDs[1]}
                questionTitle = {questionTitles[1]}
                questionText = {questionTexts[1]}
                votes = {voteCounts[1]} 
                answerCount = {answerCounts[1]}
                viewCount = {viewCounts[1]}
                timeAsked = {timesAsked[1]}
                firstName = {firstNames[1]}
                tags = {postTags[1]}
            />
            <QuestionRow
                questionID = {questionIDs[2]}
                questionTitle = {questionTitles[2]}
                questionText = {questionTexts[2]}
                votes = {voteCounts[2]} 
                answerCount = {answerCounts[2]}
                viewCount = {viewCounts[2]}
                timeAsked = {timesAsked[2]}
                firstName = {firstNames[2]}
                tags = {postTags[2]}
            />
        </main>
    );
}

export default QuestionsPage;