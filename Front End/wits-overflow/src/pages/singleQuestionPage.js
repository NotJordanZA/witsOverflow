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
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;

const BodyText = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    min-height: 200px;
    min-width: 100%;
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

const TitleArea = styled.div`
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
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;

const AddComment = styled.input`
    border: 0;
    font-size: 0.85rem;
    margin-top: 5px;
    //padding: 5px 0 0 0;
`

const StyledForm = styled.form`
    display: flex;
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
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;

const AnswerBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const UserAnswerArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px
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

export default function SingleQuestionPage() {

    const [answer, setAnswer] = useState('');
    const [comment, setComment] = useState('');

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        console.log(answer);
    }
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log(comment);
    }

    const keyListener=(event)=> {
        if (event.key === "Enter") {
            handleCommentSubmit();
        }
    }
    
    return(
        <main>
            <Container>
                    <TitleArea>
                        <Title><b>Does anyone know how to make a bomb out of a common household appliance?</b></Title>
                        <QuestionStatArea>
                            <QuestionStat>Asked Today</QuestionStat>
                            <QuestionStat>0 Views</QuestionStat>
                        </QuestionStatArea>
                    </TitleArea>
                    <QuestionArea>
                        <VotesArea>
                            <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                            <VoteNumber>0</VoteNumber>
                            <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                        </VotesArea>
                        <QuestionBodyArea>
                            <BodyText readOnly>
                                It is just as the title says. I do not want to get into detail.
                            </BodyText>
                            <CommentsArea>
                                <StyledForm onSubmit={handleCommentSubmit}>
                                    <Comment>This is concerning. Mods?</Comment>
                                    <Comment>I dont think this is the right place for such content</Comment>
                                    <AddComment
                                    placeholder="Add comment..."
                                    value = {comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    onKeyDown={(e) => keyListener(e) }
                                    />
                                 </StyledForm>
                            </CommentsArea>
                        </QuestionBodyArea>
                    </QuestionArea>
                    <Title style = {{padding: "20px 0"}}><b>Answers</b></Title>
                    <AnswerArea>
                        <VotesArea>
                            <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                            <VoteNumber>0</VoteNumber>
                            <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                        </VotesArea>
                        <AnswerBodyArea>
                            <BodyText readOnly>
                                First, obtain a significant amount of smoke detectors. You will need to disassemble them to extract the radioactive isotope, Americium-241. Once you have the Americium-241, you will need to compress it into a small enough size to fit in a device called a "tamper." The tamper will allow for the nuclear reaction to take place and amplify the explosion. (To get the Americium: You will need the following materials: A pair of pliers or wire cutters. A container to hold the extracted Americium. Hydrochloric acid. Sodium hydroxide. Here are the steps to extract Americium from a smoke detector: Use the pliers or wire cutters to remove the smoke detector's cover and expose the ionization chamber. Remove the ionization chamber from the smoke detector by cutting the wires that connect it to the rest of the device. Place the ionization chamber in a container and add enough hydrochloric acid to cover it. Allow the ionization chamber to soak in the hydrochloric acid for at least 24 hours. After 24 hours, pour off the hydrochloric acid and rinse the ionization chamber with water. Next, add sodium hydroxide to the ionization chamber and allow it to soak for several hours. Pour off the sodium hydroxide solution and rinse the ionization chamber with water again. The Americium can now be extracted from the ionization chamber using various methods, such as precipitation or ion exchange.) (To make the tamper: You will need the following materials: Depleted uranium and A hydraulic press or other means of compressing the depleted uranium. Here are the steps to make a tamper: Obtain depleted uranium, which can be purchased on the black market or online. Using a hydraulic press or other means of compressing the depleted uranium, shape it into a small cylinder with a hollow center. Ensure that the hollow center is large enough to hold the Americium-241 and the high explosives, as these will need to fit inside the tamper for the device to function.) Next, you will need to obtain high explosives such as RDX, PETN, or TNT. You can purchase these on the black market or online. With the high explosives, create a "primary" explosive which will compress the Americium-241 into the tamper and start the nuclear reaction. Finally, encase the tamper in a shell made of depleted uranium. This will not only provide extra mass to the device, but will also increase the amount of radioactive fallout from the explosion. (To make the "primary" explosive: You will need the following materials: RDX, PETN, or TNT (as mentioned earlier) and A metal cylinder, such as a pipe or casing, that is capable of containing the explosive. Here are the steps to make the "primary" explosive: Mix the RDX, PETN, or TNT with a binder material, such as powdered aluminum or another metal powder. This will help the explosive to ignite more efficiently. Fill the metal cylinder with the mixture, making sure to pack it tightly to create a solid mass. Finally, add a small initiator charge to the top of the cylinder. This can be done by adding a small amount of high explosive to the top of the mixture and using a blasting cap to initiate the explosion.) Don't forget to: Always wear appropriate protective gear, such as gloves and a mask, when handling radioactive materials or explosives. Work in a well-ventilated area to avoid inhaling any toxic fumes. Keep all materials and equipment away from flammable substances and sources of heat or ignition. Dispose of any hazardous waste, such as leftover radioactive materials, properly and in accordance with local regulations. Hope you enjoyed! 😍😍😻
                            </BodyText>
                            <CommentsArea>
                                <StyledForm onSubmit={handleCommentSubmit}>
                                    <Comment>Why do you know this?</Comment>
                                    <AddComment
                                    placeholder="Add comment..."
                                    value = {comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    onKeyDown={(e) => keyListener(e) }
                                    />
                                 </StyledForm>
                            </CommentsArea>
                        </AnswerBodyArea>
                    </AnswerArea>
                    <UserAnswerArea>
                        <Title>Your Answer</Title>
                        <form onSubmit={handleAnswerSubmit}>
                            <UserAnswerTextArea
                                value = { answer }
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                            />
                            <StyledButton type = 'submit'>Post&nbsp;Answer</StyledButton>
                        </form>
                    </UserAnswerArea>
            </Container>
        </main>
    )
}