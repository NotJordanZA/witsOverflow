import { Reset } from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";
import QuestionsPage from "./questionsPage";
import LoginPage from "./loginPage";

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
      <Header />
      <LoginPage />
    </div>
  );
}

export default App;
