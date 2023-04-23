import styled from "styled-components";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import CommentsArea from '../components/commentsArea';

const QuestionArea = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
const BodyText = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    min-height: 200px;
    min-width: 100%;
`;
const QuestionBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const VotesArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: top;
    flex-direction: column;
    padding: 0 10px;
`;
const Title = styled.header`
    font-size: 1.5rem;
    color: #000;
    b{
        font-weight:bold;
    }
    padding: 0 0 0 0;
`;
const TitleArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 10px 0;
`;
const QuestionStat = styled.div`
   // text-align: center;
    display: inline-block;
    padding: 5px;
    font-size: 0.9rem;
    color: #808191;
    margin-top: 7px;
    span{
        font-size: .7rem;
        display: block;
        font-weight: 300;
        margin-top: 4px;
    }
`;
const QuestionStatArea = styled.div`
    display: flex;
    flex-direction: row;
`;
const VoteNumber = styled.p`
    font-size: 1.1rem;
`;

function SingleQuestionPageQuestion({questionTitle, questionText, votes, viewCount, timeAsked, firstName, comments}) {


    return (
        <div>
            <TitleArea>
                <Title><b>{questionTitle}</b></Title>
                <QuestionStatArea>
                    <QuestionStat>Asked {timeAsked} by {firstName}</QuestionStat>
                    <QuestionStat>{viewCount} Views</QuestionStat>
                </QuestionStatArea>
            </TitleArea>
            <QuestionArea>
                <VotesArea>
                    <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                    <VoteNumber>{votes}</VoteNumber>
                    <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                </VotesArea>
                <QuestionBodyArea>
                    <BodyText readOnly>
                        {questionText}
                    </BodyText>
                    <CommentsArea comments = {comments}/>
                </QuestionBodyArea>
            </QuestionArea>
        </div>

    )
}

export default SingleQuestionPageQuestion;