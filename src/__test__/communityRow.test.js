import { render, screen, fireEvent } from '@testing-library/react';
import CommunityRow from "../components/CommunityRow";
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router-dom';

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('CommunityRow', () => {
const mockUser = [
        { email: 'user1@wits.ac.za', name: 'User 1', pronouns: 'They/Them' },
    ];

  it('renders user details', () => {
    render(<CommunityRow {...mockUser}/>);
    // Check if the user components are rendered
    const profileLink = screen.getByTestId("emailLinkTest");
    expect(profileLink).toBeInTheDocument();
    expect(screen.getByTestId('nameTest')).toBeInTheDocument();
    expect(screen.getByTestId('pronounsTest')).toBeInTheDocument();
  });

  
  it('navigates to the profile page when an email is clicked', () => {
    render(
      <MemoryRouter>
        <CommunityRow {...mockUser}/>
      </MemoryRouter>
    );
    const profileLink = screen.getByTestId("emailLinkTest");
    fireEvent.click(profileLink);
    expect(navigate).toHaveBeenCalledWith('/profilePage', { state: undefined });
  });
});