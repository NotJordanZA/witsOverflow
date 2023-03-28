import styled from "styled-components";
import Avatar from "../avatar.svg"
import {useNavigate} from "react-router-dom";
import UserData from "../context/userData";

const Container = styled.div`
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Name = styled.text`
    padding:10px 0 0 0;
    font-size: 1.2rem;
    font-weight: bold;
`;

const Pronouns = styled.text`
    color: #a1a1a1;
    font-size: 1rem;
`;

const Qualifications = styled.text`
    padding: 0 0 10px;
`;

const Bio = styled.text`
    display: inline-block;
    box-sizing: border-box;
    width: 50%;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #e4e4e4;
    padding: 10px;
    // padding: 0 500px;
    // background: #e4e4e4;
    h{
        font-weight: bold;
        font-size: 1.2rem;
    }
`;

const PassRow = styled.div`
    display:flex;
    padding: 10px 20px;
    position: absolute;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    right: 0;
    left:0;
`;

const ChangePassButton = styled.button`
    display: inline-block;
    border: 0px;
    border-radius: 10px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
`;

function Profile(){
    let navigate = useNavigate();
    const routeChange = () => {
        let path= '/changePassword';
        navigate(path);
    }
    return(
        <main>
            {UserData.map((item) => {
                return(
                    <Container>
                        <img style = {{ width : 90, height: 90 }}src = {Avatar} alt = "avatar" />
                        <Name>{item.name}</Name>
                        <Pronouns>{item.pronouns}</Pronouns>
                        <Qualifications>{item.qualifications}</Qualifications>
                        <Bio>{item.bio}</Bio>
                    </Container>
                )
            })}
            <PassRow>
                    <h1> </h1>
                    <ChangePassButton onClick={routeChange}>Change&nbsp;Password</ChangePassButton>
            </PassRow>
        </main>
    )
}

export default Profile;