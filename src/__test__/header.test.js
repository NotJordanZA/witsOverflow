import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import Header from "../components/header";

describe('Header', () => {
  test('renders the logo and title on the login and registration pages', () => {
    //const history = createMemoryHistory({ initialEntries: ['/questionsPage'] });
    const { container } = render(<Header/>);

    const logo = container.querySelector('.logo');
    const title = container.querySelector('.title');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test.skip('renders the logo, title, search bar, profile picture and email on other pages', () => {

    const { container } = render(
      <Header/>
    );

    const logo = container.querySelector('.logo');
    const title = container.querySelector('.title');
    const searchBar = container.querySelector('.search');
    const profilePicture = container.querySelector('.profile');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(profilePicture).toBeInTheDocument();
    //expect(email).toBeInTheDocument();
  });
});
