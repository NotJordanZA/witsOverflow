import { render, fireEvent, screen } from "@testing-library/react";
import Register from "../pages/registrationPage";
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const navigate = jest.fn();

describe("Registration Screen", () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it("should display the registration form", () => {
    render(<Register />);
    const usernameInput = screen.getByLabelText("Email:");
    const fullNameInput = screen.getByLabelText("Full Name:");
    const pronounsInput = screen.getByLabelText("Pronouns:");
    const qualificationsInput = screen.getByLabelText("Qualifications:");
    const bioInput = screen.getByLabelText("Bio:");
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    const submitButton = screen.getByRole("button");

    expect(usernameInput).toBeInTheDocument();
    expect(fullNameInput).toBeInTheDocument();
    expect(pronounsInput).toBeInTheDocument();
    expect(qualificationsInput).toBeInTheDocument();
    expect(bioInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should submit the form when valid entries are submitted", () => {
    render(<Register />);
    const usernameInput = screen.getByLabelText("Email:");
    const fullNameInput = screen.getByLabelText("Full Name:");
    const pronounsInput = screen.getByLabelText("Pronouns:");
    const qualificationsInput = screen.getByLabelText("Qualifications:");
    const bioInput = screen.getByLabelText("Bio:");
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    const submitButton = screen.getByRole("button");

    fireEvent.change(usernameInput, { target: { value: "johndoe@wits.ac.za" } });
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(pronounsInput, { target: { value: "He/Him" } });
    fireEvent.change(qualificationsInput, { target: { value: "BSc Computer Science" } });
    fireEvent.change(bioInput, { target: { value: "I am a software engineer" } });
    fireEvent.change(passwordInput, {target: {value: "AaAa11!!"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "AaAa11!!"}});
    fireEvent.click(submitButton);

    //expect(navigate).toHaveBeenCalledWith('/questionsPage', { state: 'johndoe@wits.ac.za' });
  });
});
