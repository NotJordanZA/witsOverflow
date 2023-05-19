import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const StyledName = styled.a`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    white-space: no-wrap;
`;

const StyledPronouns = styled.a`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    white-space: nowrap;
`;

const EmailLink = styled.a`
    text-decoration: none;
    color: #475be8;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
    white-space: nowrap;
`;

const StyledCommunityRow = styled.div`
    background-color: rgba(255,255,255,.05);
    padding: 15px 15px 10px;
    display: grid;
    // align-items: flex-start;
    // align-content: space-around;
    // text-align: center;
    // flex-direction: row;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    grid-template-columns: 150px 150px 1fr;
    white-space: nowrap;
    grid-column-gap: 5px;
    border-top: 1px solid #555;
`;

//function QuestionRow({Question : question}){  
function CommunityRow({userEmail, userName, userPronouns}){  
    let navigate = useNavigate();

    let userEmail1 = userEmail;
    let userName1 = userName;
    let userPronouns1 = userPronouns;
    
    const routeChangeToProfile = (email) => {
        let path= '/profilePage';
        navigate(path, {state : email});
    }

    return (
        <StyledCommunityRow>
            <StyledName data-testid = "nameTest"> {userName1} </StyledName>
            <StyledPronouns data-testid = "pronounsTest"> {userPronouns1} </StyledPronouns>
            <EmailLink onClick={() => routeChangeToProfile(userEmail1)} data-testid = "emailLinkTest"> {userEmail1} </EmailLink>
        </StyledCommunityRow>
        
    )
}

export default CommunityRow;