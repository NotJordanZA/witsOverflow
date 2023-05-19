import { Reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import QuestionsPage from "./pages/questionsPage";
import LoginPage from "./pages/loginPage";
import Rewards from "./pages/rewardsPage";
import Profile from "./pages/profilePage";
import Register from "./pages/registrationPage";
import AskPage from "./pages/askPage";
import SingleQuestionPage from "./pages/singleQuestionPage";
import ChangePassword from "./pages/changePasswordPage";
import CommunityPage from "./pages/communityPage";
import "./App.css";
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

function App() {
  return (
    <div>
        <Reset />
        <GlobalStyles/>
        <Router>
            <Routes>
              <Route path= "/" element= {<Header/>}>
                <Route path= "/loginPage" element= {<LoginPage/>} />
                <Route index element= {<LoginPage/>} />
                <Route path= "/questionsPage" element= {<QuestionsPage/>} />
                <Route path= "/rewardsPage" element= {<Rewards/>} />
                <Route path= "/profilePage" element= {<Profile/>} />
                <Route path= "/registrationPage" element= {<Register/>} />
                <Route path= "/askPage" element= {<AskPage/>} />
                <Route path= "/changePassword" element= {<ChangePassword/>} />
                <Route path= "/question" element= {<SingleQuestionPage/>} />
                <Route path= "/communityPage" element= {<CommunityPage/>} />
                <Route path= "*" element= {<LoginPage/>} />
              </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;