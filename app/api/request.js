import contacts from './contacts.json';

/** Emulate get request */
export const getContacts = () => new Promise((resolve) => {
  resolve(contacts);
});

/** Emulate delete request */
export const deleteContact = () => new Promise((resolve) => {
  resolve({ message: 'deleted' });
});
