import styled from "styled-components";
import { useState } from "react";
import CommentsArea from '../components/commentsArea';
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';

const AnswerAreaComponent = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
const AnswerBodyArea = styled.div`
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
const VoteNumber = styled.p`
    font-size: 1.1rem;
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

function AnswerArea({answerText, votes, comments1}) {
    //console.log(answerText);
    //returns a formatted answer to a question
    return (
        <div>
            <AnswerAreaComponent>
                <VotesArea>
                    <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                    <VoteNumber>{votes}</VoteNumber>
                    <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                </VotesArea>
                <AnswerBodyArea>
                    <BodyText readOnly>
                        {answerText}
                    </BodyText>
                    <CommentsArea
                        comments = {comments1}
                    />
                </AnswerBodyArea>
            </AnswerAreaComponent>
        </div>
    )
}

export default AnswerArea;