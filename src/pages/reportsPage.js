import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { getDoc, getDocs, collection } from 'firebase/firestore';
import QuestionRow from '../components/QuestionRow';

const [reportsList, setReportsList] = useState([]);
const [questionsList, setQuestionsList] = useState([]);
const reportsCollectionRef = collection(db, "reports")

    useEffect(() => {
        const getReportsList = async () => {
            try {
                const data = await getDocs(reportsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setReportsList(filteredData);
                const mapQuestions = reportsList.map( async (questions) => {
                    const questionCollectionRef = collection(db, "reports", questions.questionID);
                    const questionData = await getDoc(questionCollectionRef);
                    const filteredQuestionData = questionData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setQuestionsList(questionsList, filteredQuestionData);
                })
                let doThis = mapQuestions;
            } catch (error) {
                console.error(error)
            }
        };
        getReportsList();
    }, []);

const questionComponents = [];
const mapReports = questionsList.map((dbQuestion) => {
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
)

let doThis = mapReports;