import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import LoginPage from "../pages/loginPage";
import '@testing-library/jest-dom';
import * as router from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

const navigate = jest.fn()

describe("LoginPage", () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("submits login form with valid credentials", async () => {
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    const email = "test@wits.ac.za";
    const password = "AaAa11!!";

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    // Mock implementation for getAuth().currentUser
    const user = {
      uid: '1',
      email: email,
    };

    getAuth.mockImplementation(() => ({
      currentUser: user,
    }));

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        undefined,
        email,
        password
      )
    );

    //Redirection after successful login
    expect(navigate).toHaveBeenCalledWith('/questionsPage', { state: email });

  });
});