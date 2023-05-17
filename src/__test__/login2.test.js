import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import LoginPage from "../pages/loginPage";
import '@testing-library/jest-dom';

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

describe("LoginPage", () => {
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

    const email = "test@example.com";
    const password = "password123";

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        getAuth(),
        email,
        password
      )
    );

    // Assert the redirection or any other logic you expect to happen after successful login
  });

});