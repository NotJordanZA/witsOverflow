import { Reset } from "styled-reset";
import { createContext, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ProSidebarProvider } from "react-pro-sidebar";
import  SidebarLayout  from "./components/sidebarLayout";
import { BrowserRouter as Router, createBrowserRouter, RouterProvider, Route, Routes, Link, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/homePage";
import Header from "./components/header";
import QuestionsPage from "./pages/questionsPage";
import LoginPage from "./pages/loginPage";
import Users from "./pages/usersPage";
import Rewards from "./pages/rewardsPage";
import Profile from "./pages/profilePage";
import Navbar from "./components/navbar";
import Register from "./pages/registrationPage";
import AskPage from "./pages/askPage";
import SingleQuestionPage from "./pages/singleQuestionPage";
import {UserContext} from "./context/userContext";
import ChangePassword from "./pages/changePasswordPage";
import "./App.css";
import {firebaseConfig} from "./firebase-config/firebase";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { app } from "./firebase-config/firebase";

// Initialize Firebase
const analytics = getAnalytics(app);



const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
  body{
    background: #hhh;
    color: #2d2d2d;
    font-family: 'Rubik', sans-serif;
  }
`;

//used for the sidebar, not yet implemented
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

//leftover router element from sidebar, still needs to be implemented
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage/>,
      },
      {
        path: "/questionsPage",
        element: <QuestionsPage/>,
      },
      {
        path: "/usersPage",
        element: <Users/>,
      },
      {
        path: "/rewardsPage",
        element: <Rewards/>,
      },
      {
        path: "/profilePage",
        element: <Profile/>,
      },
      {
        path: "/Register",
        element: <Register/>,
      },
    ]
  }
])

function App() {
  //for getting user state
  const [user, setUser] = useState('');
  return (
    <div>
        <Reset />
        <GlobalStyles/>
        <Router>
          <UserContext.Provider value = {{user}}>
            <Header/>
            <Routes>
              <Route path= "/" element= {<LoginPage/>} />
              <Route path= "/questionsPage" element= {<QuestionsPage/>} />
              <Route path= "/usersPage" element= {<Users/>} />
              <Route path= "/rewardsPage" element= {<Rewards/>} />
              <Route path= "/profilePage" element= {<Profile/>} />
              <Route path= "/registrationPage" element= {<Register/>} />
              <Route path= "/askPage" element= {<AskPage/>} />
              <Route path= "/changePassword" element= {<ChangePassword/>} />
              <Route path = "/question" element= {<SingleQuestionPage/>} />
            </Routes>
          </UserContext.Provider>
        </Router>
    </div>
  );
}

export default App;