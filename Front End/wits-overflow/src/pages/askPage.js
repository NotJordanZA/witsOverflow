//AskPage.js
import styled from "styled-components";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {collection, addDoc } from "firebase/firestore";
import { db } from '../firebase-config/firebase';


const Container = styled.div`
    padding: 25px 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const QuestionTitleInput = styled.input`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
`;

const QuestionBodyTextArea = styled.textarea`
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

const StyledHeader = styled.h1`
    font-size: 1.5rem;
    color: #000;
    font-weight:bold;
`;

const HeaderRow = styled.div`
    display: grid;
    padding : 10px 0 5px 0;
`;

const StyledLabel = styled.label`
    font-size: 1.1rem;
    padding : 10px 0 5px 0;
`;

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
    width: 10%;
`;

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width:100%;
`;

export default function AskPage() {

    const questionCollectionRef = collection(db, "questions")
    
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(questionCollectionRef, {
            title: title,
            questionBody: body,
            votes: 0,
            answerCount: 0,
            views: 0,
            name: "name",
        })
        console.log(title, body);
        navigate("/questionsPage");
    }

    return (
        <main>
            <Container>
            <HeaderRow>
                <StyledHeader>
                    Ask Question
                </StyledHeader>
            </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledLabel>Title</StyledLabel>
                    <QuestionTitleInput
                        value = { title }
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <StyledLabel>Body</StyledLabel>
                    <QuestionBodyTextArea
                        value = { body }
                        onChange={(e) => setBody(e.target.value)}
                        required
                     />
                    <StyledButton type = 'submit'>
                        Post&nbsp;Question
                    </StyledButton>
                </StyledForm>
            </Container>
         </main>
    );

}