// QuestionRow.js
//element of the question page
import styled from "styled-components";
import Question from '../components/Question';


const QuestionStat = styled.div`
    text-align: center;
    display: inline-block;
    font-size: 1.2rem;
    color: #808191;
    margin-top: 7px;
    span{
        font-size: .7rem;
        display: block;
        font-weight: 300;
        margin-top: 4px;
    }
`;

const QuestionTitleArea = styled.div`
    padding: 0 25px;
`;

const Tag = styled.span`
    display: inline-block;
    margin-right: 5px;
    background-color: #d2d2d2;
    color: #5f606c;
    padding: 7px;
    border-radius: 5px;
    font-size: .9rem;
`;

const QuestionLink = styled.a`
    text-decoration: none;
    color: #475be8;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;

const StyledQuestionRow = styled.div`
    background-color: rgba(255,255,255,.05);
    color: #fff;
    padding: 15px 15px 10px;
    display: grid;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    grid-template-columns: repeat(3, minmax(min-content, 50px)) 1fr;
    grid-column-gap: 5px;
    border-top: 1px solid #555;
`;

const WhoAndWhen = styled.div`
    display: inline-block;
    color: #aaa;
    font-size: .8rem;
    float: right;
    padding: 10px 0;
`;

const UserLink = styled.a`
    color: #475be8;
`;

//{questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags}
function QuestionRow({questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags}){
    console.log("Hello :)");
    console.log(questionTitle);
    //let questionID1 = questionID;
    let questionTitle1 = questionTitle;
    //let questionText1 = questionText;
    let votes1 = votes;
    let answerCount1 = answerCount;
    let viewCount1 = viewCount;
    let timeAsked1 = timeAsked;
    let firstName1 = firstName;
    let tags1 = tags;

    return (
        <StyledQuestionRow>
            <QuestionStat> {votes1} <span>votes</span> </QuestionStat>
            <QuestionStat> {answerCount1} <span>answers</span> </QuestionStat>
            <QuestionStat> {viewCount1} <span>views</span> </QuestionStat>
            <QuestionTitleArea>
                <QuestionLink> {questionTitle1} </QuestionLink>
                <WhoAndWhen>
                    Asked {timeAsked1} by <UserLink> {firstName1} </UserLink>
                </WhoAndWhen>
                <Tag> {tags1[0]} </Tag>
                <Tag> {tags1[1]} </Tag>
                <Tag> {tags1[2]} </Tag>
                <Tag> {tags1[3]} </Tag>
            </QuestionTitleArea>
        </StyledQuestionRow>
        
    )
}

export default QuestionRow;