import styled from "styled-components";
import { useState, useEffect } from "react";
import SingleQuestionPageQuestion from "../components/singleQuestionPageQuestion";
import AnswerArea from '../components/answerArea';
import {useLocation} from 'react-router-dom';
import { db } from '../firebase-config/firebase';
import { collection, addDoc, updateDoc, doc, getDocs} from 'firebase/firestore';

const Container = styled.div`
    padding: 25px 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Title = styled.header`
    font-size: 1.5rem;
    color: #000;
    b{
        font-weight:bold;
    }
    padding: 0 0 0 0;
`;
const StyledButton = styled.button`
    display: flex !important; 
    justify-content: left !important;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
`;
const UserAnswerArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;
const UserAnswerTextArea = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
    min-height: 200px;
    min-width: 100%;
`;


//maybe add passing of comments and answers to props later?
export default function SingleQuestionPage() {
    const [answer, setAnswer] = useState('');

    //receive data from previous page. Stores as a generic object, not as a Question object. Needs to be accessed using <Question>.<property>
    const location = useLocation();
    const question = location.state;

    let questionID1 = question.questionID;
    let questionTitle1 = question.questionTitle;
    let questionText1 = question.questionText;
    let votes1 = 0;//question.votes;
    let answerCount1 = question.answerCount;
    let viewCount1 = question.viewCount;
    let timeAsked1 = question.timeAsked;
    let firstName1 = question.firstName;
    let email = sessionStorage.getItem('userEmail');
    let voted = false;
    let vote = "";

    const votesCollectionRef = collection(db, "questions", questionID1, "Votes");
    const [votesList, setVotesList] = useState([]);
    //const [votes, setVotes] = useState();

    useEffect(() => {
        const getVotesList = async () => {
            try {
                const data = await getDocs(votesCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setVotesList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        getVotesList();
        
    }, []);

    for (let i = 0; i < votesList.length; i++){
        if (votesList[i].id === email){
            voted = true;
            vote = votesList[i].voteType;
        }
    }

    for (let i = 0; i < votesList.length; i++){
        if (votesList[i].voted === true){
            if(votesList[i].voteType === "up"){
                votes1 += 1;
            }else{
                votes1 -= 1;
            }
        }
    }
    
    const questionVoteRef = doc(db, "questions", questionID1)
    updateDoc(questionVoteRef, {
        votes: votes1
      });
    const questionDocRef = doc(db, "questions", questionID1)

    const [answerList, setAnswerList] = useState([]);
    const answerCollectionRef = collection(db, "questions" , questionID1, "Answers")
    const answerAreaComponents = [];

    useEffect(() => {
        const getAnswerList = async () => {
            try {
                const data = await getDocs(answerCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setAnswerList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        getAnswerList();
    }, []);

    useEffect(() => {
        const updateView = async() => {
        await updateDoc(questionDocRef, {
            views: viewCount1+1
          });
     };
     updateView()
    }, []);

    {answerList.map((dbAnswer) => (
        
        answerAreaComponents.push(
            <AnswerArea
                questionID = {questionID1}
                answerID={dbAnswer.id}
                answerText = {dbAnswer.answer}
                votes = {dbAnswer.votes}
                questionEmail = {firstName1}
                answerEmail = {dbAnswer.name}
                currEmail = {email}
                answerHelpful = {dbAnswer.helpful}
            />
        )
    ))}

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        await addDoc(answerCollectionRef, {
            answer: answer,
            votes: 0,
            name: email,
        })
        await updateDoc(questionDocRef, {
            answerCount: answerCount1+1
          });
        console.log(answer);
        window.location.reload(false);
        setAnswer("");
    }
    if (firstName1 === email){
        return(
            <Container>
                <SingleQuestionPageQuestion
                    questionID={questionID1}
                    questionTitle = {questionTitle1}
                    questionText = {questionText1}
                    votes = {votes1}
                    viewCount = {viewCount1}
                    timeAsked = {timeAsked1}
                    firstName = {firstName1}
                    currEmail= {email}
                    currVoted = {voted}
                    currVote = {vote}
                />
                {answerAreaComponents}
            </Container>
        )
    }else{
        return(
            <Container>
                <SingleQuestionPageQuestion
                    questionID={questionID1}
                    questionTitle = {questionTitle1}
                    questionText = {questionText1}
                    votes = {votes1}
                    viewCount = {viewCount1}
                    timeAsked = {timeAsked1}
                    firstName = {firstName1}
                    currEmail= {email}
                    currVoted = {voted}
                    currVote = {vote}
                />
                {answerAreaComponents}
                <UserAnswerArea>
                        <Title>Your Answer</Title>
                        <form onSubmit={handleAnswerSubmit}>
                            <UserAnswerTextArea
                                value = { answer }
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                                data-testid = "answerAreaTest"
                            />
                            <StyledButton type = 'submit'>Post&nbsp;Answer</StyledButton>
                        </form>
                    </UserAnswerArea>
            </Container>
        )
    }
}