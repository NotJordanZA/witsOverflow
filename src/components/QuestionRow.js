import styled from "styled-components";
import {Question} from '../components/Question';
import {Link, useNavigate} from "react-router-dom";

//css for question statistics
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
//css for question title
const QuestionTitleArea = styled.div`
    padding: 0 25px;
`;
//css for question tags
const Tag = styled.span`
    display: inline-block;
    margin-right: 5px;
    background-color: #d2d2d2;
    color: #5f606c;
    padding: 7px;
    border-radius: 5px;
    font-size: .9rem;
`;
//css for the link to the question
const QuestionLink = styled.a`
    text-decoration: none;
    color: #475be8;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;
//css for question container
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
//css for the container that has who asked
const WhoAndWhen = styled.div`
    display: inline-block;
    color: #aaa;
    font-size: .8rem;
    float: right;
    padding: 10px 0;
`;
//css for the container that has who asked the question
const UserLink = styled.a`
    color: #475be8;
`;
//css for the tag that displays if reported
const ReportedTag = styled.a`
    text-decoration: none;
    color: #C21807;
    font-weight: bold;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;


//function QuestionRow({Question : question}){  
function QuestionRow({questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags, currEmail, forProfilePage, reported, forReportsPage}){  
    let navigate = useNavigate();

    //asign class variables
    let questionID1 = questionID;
    let questionTitle1 = questionTitle;
    let questionText1 = questionText;
    let votes1 = votes;
    let answerCount1 = answerCount;
    let viewCount1 = viewCount;
    let timeAsked1 = timeAsked;
    let firstName1 = firstName;
    let tags1 = tags;
    let email = sessionStorage.getItem('userEmail');
    let reported1 = reported;

    //create question object
    const question = new Question(questionID1, questionTitle1, questionText1, votes1, answerCount1, viewCount1, timeAsked1, firstName1, tags1, email, reported);
    //add variable number of tags
    const tagComponents = [];
    for (let i = 0; i < tags1.length; i++)
    {
        tagComponents.push(
            <Tag >{tags1[i]}</Tag>
        );
    }
    
    //takes user to the singleQuestion page of the question this questionRow is displaying
    function routeChangeToSingleQuestion(question) {
        let path = '/question';
        console.log("Clicked question");
        console.log(question);
        navigate(path, {state : question});

    }

    //takes the user to the profile of the email they clicked on
    const routeChangeToProfile = (email) => {
        let path= '/profilePage';
        navigate(path, {state : email});
    }

    if(reported){//checks if the question has been reported and renders accordingly
        if(forProfilePage){//checks if the question is for the profile page and renders accordingly
            return (
                <StyledQuestionRow>
                    <QuestionStat> {votes1} <span>votes</span> </QuestionStat>
                    <QuestionStat> {answerCount1} <span>answers</span> </QuestionStat>
                    <QuestionStat> {viewCount1} <span>views</span> </QuestionStat>
                    <QuestionTitleArea>
                        <QuestionLink onClick={() => routeChangeToSingleQuestion(question)}> {questionTitle1}  <ReportedTag>Reported</ReportedTag></QuestionLink>
                    </QuestionTitleArea>
                </StyledQuestionRow>
            )
        }else{ //question displayed on home page that has been reported
            return (
                <StyledQuestionRow>
                    <QuestionStat data-testid = "votesTest"> {votes1} <span>votes</span> </QuestionStat>
                    <QuestionStat data-testid = "answerCountTest"> {answerCount1} <span>answers</span> </QuestionStat>
                    <QuestionStat data-testid = "viewsTest"> {viewCount1} <span>views</span> </QuestionStat>
                    <QuestionTitleArea>
                        <QuestionLink onClick={() => routeChangeToSingleQuestion(question)}> {questionTitle1} <ReportedTag>Reported</ReportedTag> </QuestionLink>
                        {/* need to add timeAsked */}
                        <WhoAndWhen>
                            Asked by <UserLink data-testid = "authorEmailTest" onClick={() => routeChangeToProfile(firstName1)}> {firstName1} </UserLink>
                        </WhoAndWhen>
                    </QuestionTitleArea>
                </StyledQuestionRow>
            )
        }
    }else{
        if(forProfilePage){ //question displayed on a profile page that has not been reported
            return (
                <StyledQuestionRow>
                    <QuestionStat> {votes1} <span>votes</span> </QuestionStat>
                    <QuestionStat> {answerCount1} <span>answers</span> </QuestionStat>
                    <QuestionStat> {viewCount1} <span>views</span> </QuestionStat>
                    <QuestionTitleArea>
                        <QuestionLink onClick={() => routeChangeToSingleQuestion(question)}> {questionTitle1} </QuestionLink>
                    </QuestionTitleArea>
                </StyledQuestionRow>
            )
        }else if (forReportsPage){
            return (
                <StyledQuestionRow>
                    <QuestionStat data-testid = "votesTest"> {votes1} <span>votes</span> </QuestionStat>
                    <QuestionStat data-testid = "answerCountTest"> {answerCount1} <span>answers</span> </QuestionStat>
                    <QuestionStat data-testid = "viewsTest"> {viewCount1} <span>views</span> </QuestionStat>
                    <QuestionTitleArea>
                        <QuestionLink onClick={() => routeChangeToSingleQuestion(question)}> {questionTitle1} <ReportedTag>Report Active</ReportedTag></QuestionLink>
                        <WhoAndWhen>
                            Asked by <UserLink data-testid = "authorEmailTest" onClick={() => routeChangeToProfile(firstName1)}> {firstName1} </UserLink>
                        </WhoAndWhen>
                    </QuestionTitleArea>
                </StyledQuestionRow>
            )
        }else{ //question displayed on home page that has not been reported
            return (
                <StyledQuestionRow>
                    <QuestionStat data-testid = "votesTest"> {votes1} <span>votes</span> </QuestionStat>
                    <QuestionStat data-testid = "answerCountTest"> {answerCount1} <span>answers</span> </QuestionStat>
                    <QuestionStat data-testid = "viewsTest"> {viewCount1} <span>views</span> </QuestionStat>
                    <QuestionTitleArea>
                        <QuestionLink onClick={() => routeChangeToSingleQuestion(question)}> {questionTitle1}</QuestionLink>
                        <WhoAndWhen>
                            Asked by <UserLink data-testid = "authorEmailTest" onClick={() => routeChangeToProfile(firstName1)}> {firstName1} </UserLink>
                        </WhoAndWhen>
                    </QuestionTitleArea>
                </StyledQuestionRow>
            )
        }
    }
    
}

export default QuestionRow;