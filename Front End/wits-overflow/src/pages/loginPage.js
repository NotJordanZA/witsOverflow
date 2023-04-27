//login page
import { useState, useRef, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import StyledButton from "../components/styledButton";
import logo from '../logo.png';
import AuthContext from "../context/AuthProvider";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import { UserData } from "../context/userData";
import { getDoc } from "firebase/firestore";

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
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
`;

const StyledHeader = styled.h1`
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const StyledLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #475be8;
`;

const StyledForm = styled.form`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const LoginPage = () => {
    const emailRef = useRef();
    const errRef = useRef();
    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');           

    //writes submitted email and password to console, redirects to questions page on successful login
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
       // if(email.includes('.wits'))
        console.log(email, pass);
        await signInWithEmailAndPassword(getAuth(),email,pass);
        //add comparison between submitted email and password and stored password;

        if(getAuth().currentUser!=null){
            
            navigate("/questionsPage");
        }
        setEmail('');
        setPass('');
    }

    //for setting error message
    useEffect(() => {
        setErrMsg('');
    }, [email, pass])

        return<Container>
            <p ref={errRef} style={errMsg ? {} : {display: "none"}} aria-live="assertive">{errMsg}</p>
            <img style = {{ width : 90, height: 90 }}src = {logo} alt = "logo" />
            <StyledHeader>Login</StyledHeader>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput
                    value = { email }
                    placeholder="email"
                    type='email'
                    id="email"
                    ref={emailRef}
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
                <StyledButton type = 'submit'>Login</StyledButton>
            </StyledForm>
            <p>Don't have an account?<br/>
                <span className="line">
                    <StyledLink href="/registrationPage"><b>Sign Up</b></StyledLink>
                </span>
            </p>
        </Container>;
}

export default LoginPage;