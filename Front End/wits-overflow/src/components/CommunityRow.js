import styled from "styled-components";
import {Question} from './Question';
import {commUser} from './commUser'
import {Link, useNavigate} from "react-router-dom";
import { useState, useRef, useEffect } from "react";




const NameArea = styled.div`
    padding: 5px 20px 5px 20px;
`;

const CommLink = styled.a`
    text-decoration: none;
    color: #475be8;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;

const StyledCommunityRow = styled.div`
    background-color: rgba(255,255,255,.05);
    padding: 15px 15px 10px;
    display: flex;
    align-items: flex-start;
    align-content: space-around;
    text-align: center;
    flex-direction: row;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    grid-template-columns: repeat(3, minmax(min-content, 50px)) 1fr;
    grid-column-gap: 5px;
    border-top: 1px solid #555;
`;

const UserLink = styled.a`
    color: #475be8;
`;


//function QuestionRow({Question : question}){  
function CommunityRow({userEmail, userName, userPronouns}){  
    let navigate = useNavigate();

    let userEmail1 = userEmail;
    let userName1 = userName;
    let userPronouns1 = userPronouns;
    let email = sessionStorage.getItem('userEmail');

    const commuser = new commUser(userEmail1, userName1, userPronouns1);
    
    // //add variable number of tags
    // const tagComponents = [];
    // for (let i = 0; i < tags1.length; i++)
    // {
    //     tagComponents.push(
    //         <Tag>{tags1[i]}</Tag>
    //     );
    // }
    
    //takes user to the singleQuestion page of the question this questionRow is displaying
    function routeChangeToSingleQuestion(commuser) {
        let path = '/profilePage';
        console.log("Clicked user");
        console.log(commuser);
        navigate(path, {state : commuser});

    }

    return (
        <StyledCommunityRow>
            <NameArea>
                <CommLink onClick={() => routeChangeToSingleQuestion(commuser)}> {userEmail1} </CommLink>
            </NameArea>
            <NameArea> {userName1} </NameArea>
            <NameArea> {userPronouns1} </NameArea>
        </StyledCommunityRow>
        
    )
}

export default CommunityRow;