import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from "../pages/loginPage";

describe('LoginPage', () => {
  test.skip('renders login form', () => {
    render(<LoginPage />);

    // Check that the email input field is rendered
    const emailInput = screen.getByPlaceholderText('email');
    expect(emailInput).toBeInTheDocument();

    // Check that the password input field is rendered
    const passwordInput = screen.getByPlaceholderText('password');
    expect(passwordInput).toBeInTheDocument();

    // Check that the login button is rendered
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Check that the sign up link is rendered
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
  });

  test.skip('submits form data on login button click', () => {
    render(<LoginPage />);

    // Fill in the email and password fields
    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput = screen.getByPlaceholderText('password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Click the login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Check that the form was submitted with the correct data
    expect(console.log).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test.skip('redirects to questions page on successful login', async () => {
    // Mock the signInWithEmailAndPassword function
    const mockSignInWithEmailAndPassword = jest.fn(() => Promise.resolve());
    jest.mock('firebase/auth', () => ({
      getAuth: () => ({ signInWithEmailAndPassword: mockSignInWithEmailAndPassword }),
    }));

    // Render the LoginPage component
    const navigateMock = jest.fn();
    render(<LoginPage navigate={navigateMock} />);

    // Fill in the email and password fields and click the login button
    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'ruben@wits.ac.za' } });

    const passwordInput = screen.getByPlaceholderText('password');
    fireEvent.change(passwordInput, { target: { value: 'AaAa1!1!' } });

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Wait for the signInWithEmailAndPassword function to resolve
    await Promise.resolve();

    // Check that the user email was stored in session storage
    expect(sessionStorage.getItem('userEmail')).toEqual('test@example.com');

    // Check that the user was redirected to the questions page
    expect(navigateMock).toHaveBeenCalledWith('/questionsPage', { state: 'test@example.com' });
  });
});
