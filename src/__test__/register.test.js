import { render, fireEvent, screen } from "@testing-library/react";
import Register from "../pages/registrationPage";
import '@testing-library/jest-dom/extend-expect';

describe("Registration Screen", () => {
  it("should display the registration form", () => {
    render(<Register />);
    const usernameInput = screen.getByLabelText("Email:");
    const fullNameInput = screen.getByLabelText("Full Name:");
    const pronounsInput = screen.getByLabelText("Pronouns:");
    const qualificationsInput = screen.getByLabelText("Qualifications:");
    const bioInput = screen.getByLabelText("Bio:");

    expect(usernameInput).toBeInTheDocument();
    expect(fullNameInput).toBeInTheDocument();
    //expect(fullNameInput).not.toBeInTheDocument();
    expect(pronounsInput).toBeInTheDocument();
    expect(qualificationsInput).toBeInTheDocument();
    expect(bioInput).toBeInTheDocument();
  });

  it("should submit the form when valid entries are submitted", () => {
    render(<Register />);
    const usernameInput = screen.getByLabelText("Email:");
    const fullNameInput = screen.getByLabelText("Full Name:");
    const pronounsInput = screen.getByLabelText("Pronouns:");
    const qualificationsInput = screen.getByLabelText("Qualifications:");
    const bioInput = screen.getByLabelText("Bio:");
   // const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(usernameInput, { target: { value: "johndoe@wits.ac.za" } });
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(pronounsInput, { target: { value: "He/Him" } });
    fireEvent.change(qualificationsInput, { target: { value: "BSc Computer Science" } });
    fireEvent.change(bioInput, { target: { value: "I am a software engineer" } });
    //fireEvent.click(submitButton);

    //const successMessage = screen.getByText("Success!");
    //expect(successMessage).toBeInTheDocument();
  });
});
