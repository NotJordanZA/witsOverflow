// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
import StyledButton from '../components/styledButton';
import {Question} from '../components/Question';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { getDocs, collection } from 'firebase/firestore';

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

    //possibly change question row to take a Question object instead of all of the seperate fields
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

    //in future, we use firebase to populate each of these arrays
    
    const routeChangeToAskQuestion = () => {
        let path= '/askPage';
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