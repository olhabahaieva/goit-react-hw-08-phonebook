import React from 'react';
import { Button } from '@mui/material';
import css from './Navigation.module.css';

export const Header = () => {
  return (
    <div className={css.header}>
      <p className={css.logo}>Logo</p>
      <div className={css.buttonContainer}>
          <Button variant="outlined" name="submit" type="submit">
            Login
          </Button>
          <Button variant="contained" name="submit" type="submit">
            Register
          </Button>
      </div>
    </div>
  );
};

export default Header;
