import styled from "styled-components";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import { useState } from "react";

const Container = styled.div`
    padding: 25px 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const QuestionArea = styled.div`
    display: flex;
    flex-direction: row;
`;

const QuestionBodyText = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    width: 90%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    min-height: 200px;
    min-width: 90%;
`;

const QuestionBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const VotesArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: top;
    flex-direction: column;
    padding: 0 10px;
`;

const Title = styled.header`
    font-size: 1.5rem;
    color: #000;
    b{
        font-weight:bold;
    }
    padding: 0 0 0 0;
`;

const QuestionTitleArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 10px 0;
`;

const QuestionStat = styled.div`
   // text-align: center;
    display: inline-block;
    padding: 5px;
    font-size: 0.9rem;
    color: #808191;
    margin-top: 7px;
    span{
        font-size: .7rem;
        display: block;
        font-weight: 300;
        margin-top: 4px;
    }
`;

const QuestionStatArea = styled.div`
    display: flex;
    flex-direction: row;
`;

const VoteNumber = styled.p`
    font-size: 1.1rem;
`;

const CommentsArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const Comment = styled.text`
    border: 0;
    font-size: 0.85rem;
    padding: 5px 0 0 0;
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: bottom;
    flex-direction: column;
    width:100%;
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

const AnswerArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const AnswerTextArea = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 90.5%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
    min-height: 200px;
    min-width: 90.5%;
`;

export default function SingleQuestionPage() {

    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(answer);
    }
    return(
        <main>
            <Container>
                    <QuestionTitleArea>
                        <Title><b>This is the title</b></Title>
                        <QuestionStatArea>
                            <QuestionStat>Asked Today</QuestionStat>
                            <QuestionStat>0 Views</QuestionStat>
                        </QuestionStatArea>
                    </QuestionTitleArea>
                    <QuestionArea>
                        <VotesArea>
                            <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                            <VoteNumber>0</VoteNumber>
                            <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                        </VotesArea>
                        <QuestionBodyArea>
                            <QuestionBodyText>
                                I strongly believe that one of the keys to success is to nurture a genuine interest in the work one performs and that through this process a passion will develop. When one is passionate about what they do this allows them to achieve their true potential. My personal fulfillment comes from seeing other’s potential being realised.I strongly believe that one of the keys to success is to nurture a genuine interest in the work one performs and that through this process a passion will develop. When one is passionate about what they do this allows them to achieve their true potential. My personal fulfillment comes from seeing other’s potential being realised.I strongly believe that one of the keys to success is to nurture a genuine interest in the work one performs and that through this process a passion will develop. When one is passionate about what they do this allows them to achieve their true potential. My personal fulfillment comes from seeing other’s potential being realised.I strongly believe that one of the keys to success is to nurture a genuine interest in the work one performs and that through this process a passion will develop. When one is passionate about what they do this allows them to achieve their true potential. My personal fulfillment comes from seeing other’s potential being realised.
                            </QuestionBodyText>
                            <CommentsArea>
                                <Comment>This question sucks. There isnt even a question, just some weird monologue</Comment>
                                <Comment>I agree with the other comment. Bad "question"</Comment>
                            </CommentsArea>
                        </QuestionBodyArea>
                    </QuestionArea>
                    <AnswerArea>
                        <Title>Your Answer</Title>
                        <form onSubmit={handleSubmit}>
                            <AnswerTextArea
                                value = { answer }
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                            />
                            <StyledButton type = 'submit'>Post&nbsp;Answer</StyledButton>
                        </form>
                    </AnswerArea>
            </Container>
        </main>
    )
}