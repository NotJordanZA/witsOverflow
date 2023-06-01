import React from 'react';
import ChangePasswordPage from '../pages/changePasswordPage';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('ChangePasswordPage', () => {
  it('renders the ChangePasswordPage component and handles form submission', async () => {
    // Render the ChangePasswordPage component
    const { getByLabelText, getByRole } = render(<ChangePasswordPage />);
    
    // Fill in the input fields
    const oldPwdInput = getByLabelText('Current Password:');
    const pwdInput = getByLabelText('New Password:');
    const confirmPwdInput = getByLabelText('Confirm New Password:');
    
    fireEvent.change(oldPwdInput, { target: { value: 'currentPassword' } });
    fireEvent.change(pwdInput, { target: { value: 'newPassword' } });
    fireEvent.change(confirmPwdInput, { target: { value: 'newPassword' } });
    
    // Submit the form
    const submitButton = getByRole('button');
    fireEvent.click(submitButton);
    
    // Wait for the form submission to complete
    await waitFor(() => {
      // Assert that the form submission is handled correctly
      // You can add additional assertions here based on your specific requirements
      expect(submitButton).toBeDisabled();
    });
  });
});
