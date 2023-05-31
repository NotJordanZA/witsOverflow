// QuestionsPage.js
import styled from 'styled-components'
import QuestionRow from '../components/QuestionRow';
import StyledButton from '../components/styledButton';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { getDocs, collection } from 'firebase/firestore';

//CSS Component: Header
const StyledHeader = styled.h1`
    font-size: 1.5rem;
    color: #000;
    font-weight:bold;
    padding: 10px 0;
`;

//CSS Component: Row for Header
const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 1fr min-content;
    padding: 10px 20px;
`;
//Dummy Tags
let postTags = [["a", "b", "c", "d"], ["e", "f", "g"], ["i", "j", "k", "l"], ["m", "n", "o", "p", "q"]];

function QuestionsPage(){
    
    //Declare a way to navigate between pages
    let navigate = useNavigate();
    //Get the current user's email from the session storage
    const email = sessionStorage.getItem('userEmail');

    //Declare const for questionList array  
    const [questionList, setQuestionList] = useState([]);
    //Declare a const for a reference to the questions collection
    const questionCollectionRef = collection(db, "questions")

    //Fetch the questions from the database
    useEffect(() => {
        const getQuestionList = async () => {
            try {
                const data = await getDocs(questionCollectionRef);
                {/*Map the data for the questions to a usable format*/}
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setQuestionList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        //Call the method defined above
        getQuestionList();
    }, []);
    console.log("questionList", questionList);

    //Declare array of QuestionRow Components
    const questionComponents = [];
    let i = 0;
    //Map the questions fetched from the database onto the QuestionRow component
    const mapQuestions = questionList.map((dbQuestion) => {
        //Render one way if user is a moderator
        if(email.indexOf("student") === -1){
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
                    reported = {dbQuestion.reported}
                />
                )
        }else if(dbQuestion.reported != true){
            //Render questions not reported
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
                    reported = {dbQuestion.reported}
                />
                )
        }
        }
    )
    
    //Used to call the mapping of the questions onto the QuestionRow component
    let doThis = mapQuestions;
    
    //Route to the Ask Question page
    const routeChangeToAskQuestion = () => {
        let path= '/askPage';
        navigate(path, {state : email});
    }

    return (
        <main>
            {/* Render the Header and the Ask Question button */}  
            <HeaderRow>
                <StyledHeader> Top Questions </StyledHeader>
                <StyledButton onClick={routeChangeToAskQuestion}> Ask&nbsp;Question </StyledButton>
            </HeaderRow>
            {/* Render the array of QuestionRow objects for all Questions */} 
            {questionComponents}
        </main>
    );
}

export default QuestionsPage;