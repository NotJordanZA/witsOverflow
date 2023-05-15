import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

import Header from "../components/header";

describe('Header', () => {
  test.skip('renders the logo and title on the questions page', () => {
    //const history = createMemoryHistory({ initialEntries: ['/questionsPage'] });
    const { container } = render(<Header/>);

    const logo = container.querySelector('.logo');
    const title = container.querySelector('.title');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test.skip('renders the search bar, profile picture and email on other pages', () => {

    const { container } = render(
      <Header/>
    );

    const searchBar = container.querySelector('.search');
    const profilePicture = container.querySelector('.profile img');
    const email = screen.getByText(/user email/i);

    expect(searchBar).toBeInTheDocument();
    expect(profilePicture).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
