// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
import StyledButton from '../components/styledButton';
import { useNavigate } from "react-router-dom";
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
let postTags = [["a", "b", "c", "d"], ["e", "f", "g"], ["i", "j", "k", "l"], ["m", "n", "o", "p", "q"]];
let count = 0;

function QuestionsPage(){
    
    let navigate = useNavigate();
    const email = sessionStorage.getItem('userEmail');

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
                currEmail= {email}
                forProfilePage = {false}
            />
        )
    ))}
    
    const routeChangeToAskQuestion = () => {
        let path= '/askPage';
        navigate(path, {state : email});
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