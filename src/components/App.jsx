import React, { useEffect } from 'react';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts';
import { useDispatch} from 'react-redux';
import { fetchContact } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Phonebook />
      <Contacts />
    </div>
  );
};
