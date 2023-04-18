//AskPage.js
import styled from "styled-components";
import { useState } from "react";
import { useNavigate} from "react-router-dom";

const Container = styled.div`
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const QuestionTitleInput = styled.input`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 70%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
`;

const QuestionBodyTextArea = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 70%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
    min-height: 200px;
    min-width: 70%;
`;

const StyledHeader = styled.h1`
    font-size: 1.5rem;
    color: #000;
    font-weight:bold;
    padding: 10px 0;
`;

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 15% 1fr;
    padding: 10px;
`;

const StyledLabel = styled.label`
    font-size: 1.1rem;
    marginLeft: "auto";
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

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width:100%;
`;

export default function AskPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, body);
        navigate("/question");
    }

    return (
        <main>
            <HeaderRow>
                <StyledHeader></StyledHeader>
                <StyledHeader>
                    Ask Question
                </StyledHeader>
            </HeaderRow>
            <Container>
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