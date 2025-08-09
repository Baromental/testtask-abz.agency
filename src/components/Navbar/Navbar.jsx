import React from 'react';
import { ReactComponent as LogoIcon } from '../../images/Logo.svg';
import { Link } from 'react-router';

import s from './Navbar.module.css';

export const Navbar = () => {
  return (
    <header className={s.headerContainer}>
      <Link to="/">
        <LogoIcon />
      </Link>

      <div className={s.buttonContainer}>
        <button className={s.button}>Users</button>
        <button className={s.button}>Sign up</button>
      </div>
    </header>
  );
};
