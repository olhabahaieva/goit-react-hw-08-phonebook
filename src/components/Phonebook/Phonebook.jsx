import React, { useState } from 'react';
import css from './Phonebook.module.css';
import Section from 'components/Section';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

function Phonebook() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const { name, number } = state;

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (contactAlreadyExists(name, number)) {
      alert(`${name} with number ${number} is already in contacts`);
    } else {
      dispatch(addContact({ name, number }));
      resetForm();
    }
  };

  const contactAlreadyExists = (name, number) => {
    return contacts.some(
      contact =>
        contact.text.name.toLowerCase() === name.toLowerCase() &&
        contact.text.number === number
    );
  };

  const resetForm = () => {
    setState({
      name: '',
      number: '',
    });
  };

  return (
    <>
      <Section title="Phonebook">
        <Box
          // sx={{ bgcolor: 'primary.white', width: 300 }}
          className={css.phonebook}
        >
          <form className={css.form} onSubmit={handleFormSubmit}>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <label className={css.label} htmlFor="number">
              Number
            </label>
            <Input
              type="tel"
              name="number"
              value={number}
              onChange={handleInputChange}
            />
            <Button variant="contained" name="submit" type="submit">
              Add contact
            </Button>
          </form>
        </Box>
      </Section>
    </>
  );
}

Phonebook.propTypes = {
  state: PropTypes.array,
  createContact: PropTypes.func,
};

export default Phonebook;
