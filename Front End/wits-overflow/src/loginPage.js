import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./styledButton";
import logo from './logo.png';


const Container = styled.div`
    padding: 200px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const StyledInput = styled.input`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 250px;
    box-sizing: border-box;
    padding 15px 0 15px 10px;
    margin-bottom: 20px;
`;
const LoginButton = styled.button`
    display: inline-block;
    border: 0px;
    border-radius: 10px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
`;

const StyledHeader = styled.h1`
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const StyledCreateLink = styled.a`
    display: inline-block;
    line-height: 15px;
    padding: 20px 0px;
    text-decoration: none;
    blue{
        color: #475be8;
      }
    `;

function LoginPage() {

const [email, setEmail] = useState('');
const [pass, setPass] = useState('');
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(email, pass);
  setEmail('');
  setPass('');
}
    return(
        <Container>
            <img style = {{ width : 90, height: 90 }}src = {logo} alt = "logo" />
            <StyledHeader>Login</StyledHeader>
            <form onSubmit={handleSubmit}>
              <StyledInput 
                    value = { email } 
                    placeholder="email" 
                    type='email'
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    textAlign = 'center'
                    />
              <StyledInput 
                    value = { pass } 
                    placeholder="password" 
                    type='password'
                    id="pass"
                    onChange={(e) => setPass(e.target.value)}
                    required
                    />
            </form>
            <LoginButton type = 'submit'>login</LoginButton>
            <p>
                    <span className="line">
                        {/*put router link here */}
                        <StyledCreateLink href="#">Don't have an account? <blue>Sign Up</blue></StyledCreateLink>
                    </span>
                </p>
        </Container>
    );
}

export default LoginPage;