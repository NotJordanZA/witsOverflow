import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from "../components/header";
import '@testing-library/jest-dom';

describe('Header component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('renders the header without user email', () => {
    render(<Header />);
    // Check for logo
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    // Check for title
    expect(screen.getByText('wits overflow')).toBeInTheDocument();
    // Verify absence of user-related elements
    expect(screen.queryByTestId('headerSearch')).not.toBeInTheDocument();
    expect(screen.queryByAltText('users')).not.toBeInTheDocument();
    expect(screen.queryByAltText('avatar')).not.toBeInTheDocument();
    expect(screen.queryByText('user-email@wits.ac.za')).not.toBeInTheDocument();
  });

  test('renders the header with user email', () => {
    sessionStorage.setItem('userEmail', 'user-email@wits.ac.za');
    render(<Header />);
    // Check for logo
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    // Check for title
    expect(screen.getByText('wits overflow')).toBeInTheDocument();
    // Check for user-related elements
    expect(screen.getByTestId('headerSearch')).toBeInTheDocument();
    expect(screen.getByAltText('users')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText('user-email@wits.ac.za')).toBeInTheDocument();
  });
});