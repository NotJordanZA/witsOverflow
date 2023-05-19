import { render, screen } from '@testing-library/react';
import Profile from "../pages/profilePage";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

// Mock the react-router-dom module functions
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({ state: null })),
}));

jest.mock('../firebase-config/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe('Profile component', () => {
  it('should render user interface', () => {
    const profile = {
      email: "test@wits.ac.za",
      name: "John Doe",
      pronouns: "they/them",
      qualifications: "certified tester",
      bio: "I love testing!"
    };
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({ state: profile });
    render(
        <Profile currEmail={"test@wits.ac.za"}/>
    );

    // Verify that the user interface is rendered correctly
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    // const nameTest = screen.getByTestID('nameTest');
    // expect(nameTest).toBeInTheDocument();
    expect(screen.getByTestId('pronounsTest')).toBeInTheDocument();
    expect(screen.getByTestId('qualificationsTest')).toBeInTheDocument();
    expect(screen.getByTestId('bioTest')).toBeInTheDocument();
    // expect(screen.getByTestId('signOutTest')).toBeInTheDocument();
    // expect(screen.getByTestId('passwordChangeTest')).toBeInTheDocument();
  })
});
    