import React from 'react';
import css from './Contacts.module.css';
import Section from 'components/Section';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, selectFilter } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { setFilter } from 'redux/filterSlice';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(selectFilter);

  const handleFilterChange = event => {
    const inputValue = event.target.value;
    dispatch(setFilter(inputValue.toLowerCase()));
  };

  const handleDeleteClick = async contactId => {
    try {
      await dispatch(deleteContact(contactId));
    } catch (error) {}
  };

  const filteredContacts = () => {
    if (!filter || filter === '') {
      return contacts.items;
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.items.filter(contact =>
      contact.text.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Section title="Contacts">
      <div className={css.contacts}>
        <label className={css.label} htmlFor="search">
          Find contacts by name
        </label>
        <Input style={{ width: '300px' }}
          onChange={handleFilterChange}
          value={filter}
          className={css.filterInput}
          type="search"
        />
      </div>

      <ul className={css.contacts}>
        {filteredContacts().map(contact => (
          <li key={contact.id} className={css.contact}>
            {contact.text.name} : {contact.text.number}
            <Button variant="outlined" color="error"
              onClick={() => handleDeleteClick(contact.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Contacts;
