import styled from 'styled-components'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { getDoc, getDocs, collection, doc } from 'firebase/firestore';
import QuestionRow from '../components/QuestionRow';
import { useNavigate } from "react-router-dom";

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

function ReportsPage(){

    let navigate = useNavigate();
    const email = sessionStorage.getItem('userEmail');

    //Declare consts for the reportList and questionsList arrays.
    const [reportsList, setReportsList] = useState([]);
    const [questionsList, setQuestionsList] = useState([]);
    //Declare a const for the reference to the reports collection.
    const reportsCollectionRef = collection(db, "reports")

    //Fetch the Reports and the correlating Questions containing the reported post.
    useEffect(() => {
        const getReportsList = async () => {
            try {
                const data = await getDocs(reportsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setReportsList(filteredData);
                console.log(reportsList);
                console.log("reportslist logged")
            } catch (error) {
                console.error(error)
            }
        };
        getReportsList();
    }, []);

    let arr = []
    useEffect(()=>{
        reportsList.map( async (questions) => {
        const questionCollectionRef = doc(db, "questions", questions.id);
        const questionData = await getDoc(questionCollectionRef);
        const qData = questionData.data();
        qData.id = questions.id;
        // console.log(qData);
        // console.log("qData logged");
        arr.push(qData);
        setQuestionsList(arr);
    })}, [reportsList])

    const questionComponents = [];
    // Map the questions with active reports to the QuestionRow component.
    {questionsList.map((dbQuestion) => (
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
                    tags = {["a", "b", "c", "d"]}
                    currEmail= {email}
                    forProfilePage = {false}
                    reported = {dbQuestion.reported}
                    forReportsPage = {true}
                />
            )
    ))}
    
    return (
        <main>
            {/* Create a Header for the page */}
            <HeaderRow>
                <StyledHeader> Questions With Active Reports </StyledHeader>
            </HeaderRow>
            {/* Render the Questions with active reports */}
            {/* {console.log(questionComponents)} */}
            {questionComponents}
        </main>
    );
}

export default ReportsPage;