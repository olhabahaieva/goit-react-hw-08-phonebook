import React, { useState } from 'react';
import css from './Phonebook.module.css';
import Section from 'components/Section';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';

function Phonebook() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const { name, number } = state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
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
      (contact) =>
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
        <div className={css.phonebook}>
          <form className={css.form} onSubmit={handleFormSubmit}>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <label className={css.label} htmlFor="number">
              Number
            </label>
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleInputChange}
            />

            <button className={css.button} name="submit" type="submit">
              Add contact
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}

Phonebook.propTypes = {
  state: PropTypes.array,
  createContact: PropTypes.func,
};

export default Phonebook;
