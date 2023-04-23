// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
// import QuestionRow2 from '../components/QuestionRow2';
// import QuestionRow3 from '../components/QuestionRow3';
// import QuestionRow4 from '../components/QuestionRow4';
// import QuestionRow5 from '../components/QuestionRow5';
import StyledButton from '../components/styledButton';
import {Question} from '../components/Question';
import { db } from '../firebase-config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

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


//dummy data to use to populate questions page. Stored as an array to ensure conciseness
// let questionIDs = [0, 1, 2, 3];
// let questionTitles = ["Conditional joining of dataframes", "How to find similarity between two vectors?","Spring stub returns incorrect response on GET endp with different number of parameters sent", "How to solve a homogeneuos linear differential equation"];
// let questionTexts = ["Howdy partner 1", "Howdy partner 2", "Howdy partner 3", "Howdy partner 4"];
// let voteCounts = [0, 1, 0, 7];
// let answerCounts = [0, 1, 0, 3];
// let viewCounts = [4, 5, 2, 27];
// let timesAsked = ["3 min ago", "1 hr ago", "17 min ago", "1 day ago"];
// let firstNames = ["Jordan", "Ndivhuwo", "Troy", "Ruben"];
let postTags = [["a", "b", "c", "d"], ["e", "f", "g"], ["i", "j", "k", "l"], ["m", "n", "o", "p", "q"]];

function QuestionsPage(){
    let navigate = useNavigate();

    const [questionList, setQuestionList] = useState([]);
    const questionCollectionRef = collection(db, "questions")

    useEffect(() => {
        const getQuestionList = async () => {
            try {
                const data = await getDocs(questionCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setQuestionList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };

        getQuestionList();
    }, []);


    const questionComponents = [];
    let i = 0;
    {questionList.map((dbQuestion) => (
        questionComponents.push(
            <QuestionRow 
                questionID = {dbQuestion.id}
                questionTitle = {dbQuestion.title}
                questionText = {dbQuestion.questionBody}
                votes = {dbQuestion.votes} 
                answerCount = {dbQuestion.answerCount}
                viewCount = {dbQuestion.views}
                timeAsked = "time"
                firstName = {dbQuestion.name}
                tags = {postTags[i]}
            />
        )
    ))}

    function routeChangeToAskQuestion() {
        let path = '/askPage';
        navigate(path);
    }

    return (
        <main>
            <HeaderRow>
                <StyledHeader> Top Questions </StyledHeader>
                <StyledButton onClick={routeChangeToAskQuestion}> Ask&nbsp;Question </StyledButton>
            </HeaderRow>
            {questionComponents}
        </main>
    );
}

export default QuestionsPage;