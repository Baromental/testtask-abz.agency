import React from 'react';
import { ReactComponent as LogoIcon } from '../../images/Logo.svg';
import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <LogoIcon />
      </Link>

      <div>
        <button>Users</button>
        <button>Sign up</button>
      </div>
    </header>
  );
};
