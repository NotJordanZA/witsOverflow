import { render, screen } from '@testing-library/react';
import CommunityPage from '../pages/communityPage';
import '@testing-library/jest-dom/extend-expect';

// Mock the react-router-dom module functions
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  }));

describe('CommunityPage', () => {
  test('renders community users', async () => {
    // Mock the user data
    const mockUsers = [
      { email: 'user1@wits.ac.za', name: 'User 1', pronouns: 'They/Them' },
      { email: 'user2.wits.ac.za', name: 'User 2', pronouns: 'She/Her' },
    ];
    
    // Mock the getDocs function to return the mock user data
    jest.mock('firebase/firestore', () => ({
      getDocs: jest.fn(() => Promise.resolve({ docs: mockUsers })),
      collection: jest.fn(),
    }));

    render(<CommunityPage />);

    // Wait for the component to finish loading and rendering
    await screen.findByText('Community');
  });
});