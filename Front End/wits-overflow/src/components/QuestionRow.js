import styled from "styled-components";
import {Question} from '../components/Question';
import {Link, useNavigate} from "react-router-dom";
import { useState, useRef, useEffect } from "react";


const QuestionStat = styled.div`
    text-align: center;
    display: inline-block;
    font-size: 1.2rem;
    color: #808191;
    margin-top: 7px;
    span{
        font-size: .7rem;
        display: block;
        font-weight: 300;
        margin-top: 4px;
    }
`;

const QuestionTitleArea = styled.div`
    padding: 0 25px;
`;

const Tag = styled.span`
    display: inline-block;
    margin-right: 5px;
    background-color: #d2d2d2;
    color: #5f606c;
    padding: 7px;
    border-radius: 5px;
    font-size: .9rem;
`;

const QuestionLink = styled.a`
    text-decoration: none;
    color: #475be8;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;

const StyledQuestionRow = styled.div`
    background-color: rgba(255,255,255,.05);
    color: #fff;
    padding: 15px 15px 10px;
    display: grid;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    grid-template-columns: repeat(3, minmax(min-content, 50px)) 1fr;
    grid-column-gap: 5px;
    border-top: 1px solid #555;
`;

const WhoAndWhen = styled.div`
    display: inline-block;
    color: #aaa;
    font-size: .8rem;
    float: right;
    padding: 10px 0;
`;

const UserLink = styled.a`
    color: #475be8;
`;


//function QuestionRow({Question : question}){  
function QuestionRow({questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags}){  
    let navigate = useNavigate();

    let questionID1 = questionID;
    let questionTitle1 = questionTitle;
    let questionText1 = questionText;
    let votes1 = votes;
    let answerCount1 = answerCount;
    let viewCount1 = viewCount;
    let timeAsked1 = timeAsked;
    let firstName1 = firstName;
    let tags1 = tags;

    const question = new Question(questionID1, questionTitle1, questionText1, votes1, answerCount1, viewCount1, timeAsked1, firstName1, tags1);
    
    //add variable number of tags
    const tagComponents = [];
    for (let i = 0; i < tags1.length; i++)
    {
        tagComponents.push(
            <Tag>{tags1[i]}</Tag>
        );
    }
    
    //takes user to the singleQuestion page of the question this questionRow is displaying
    function routeChangeToSingleQuestion(question) {
        let path = '/question';
        console.log("Clicked question");
        console.log(question);
        navigate(path, {state : question});

    }

    return (
        <StyledQuestionRow>
            <QuestionStat> {votes1} <span>votes</span> </QuestionStat>
            <QuestionStat> {answerCount1} <span>answers</span> </QuestionStat>
            <QuestionStat> {viewCount1} <span>views</span> </QuestionStat>
            <QuestionTitleArea>

                <QuestionLink onClick={() => routeChangeToSingleQuestion(question)}> {questionTitle1} </QuestionLink>

                <WhoAndWhen>
                    Asked {timeAsked1} by <UserLink> {firstName1} </UserLink>
                </WhoAndWhen>
                {tagComponents}
            </QuestionTitleArea>
        </StyledQuestionRow>
        
    )
}

export default QuestionRow;