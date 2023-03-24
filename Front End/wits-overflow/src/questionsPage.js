import styled from "styled-components";
import StyledButton from "./styledButton";

const StyledHeader = styled.h1`
    padding: 10px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const HeaderRow = styled.div`
    display:grid;
    grid-template-columns: 1fr min-content;
    padding: 10px 20px;
`;


const QuestionRow = styled.div`
    padding: 10px 34px;
    display: grid;
    grid-template-rows: 25px 40px;
`;

const QuestionStat = styled.div`
    span{
        font-size: .8rem;
    }
`;

const StatRow = styled.div`
    padding: 0 0px;
    display: grid;
    grid-template-columns: 60px 60px 60px;
`;

const QuestionTitle = styled.h1`

`;

const QuestionTime = styled.h2`
    font-size: .8rem;
`;

function QuestionsPage() {
    return(
        <main>
            <HeaderRow>
                <StyledHeader>Top Questions</StyledHeader>
                <StyledButton>Ask&nbsp;Question</StyledButton>
            </HeaderRow>
            <QuestionRow>
                <StatRow>
                    <QuestionStat>0<span>votes</span></QuestionStat>
                    <QuestionStat>0<span>answers</span></QuestionStat>
                    <QuestionStat>0<span>views</span></QuestionStat>
                </StatRow>
                <QuestionTitle>how to setup react</QuestionTitle> 
                <QuestionTime>10 minutes ago</QuestionTime> 
            </QuestionRow> 
        </main>
        
    );
}

export default QuestionsPage;