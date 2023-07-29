import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.items;

export const selectError = state => state.contacts.error;

export const selectStatusFilter = state => state.contacts.items;

export const getContacts = (store) => {
    return store.contacts;
  };

  export const selectFilter = state => state.filter.filter;
  
  export const selectVisibleContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
      if (!filter || filter === '') {
        return contacts;
      }
  
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.text.name.toLowerCase().includes(normalizedFilter)
      );
    }
  );