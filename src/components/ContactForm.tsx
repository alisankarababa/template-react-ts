import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useLocalStorage } from 'usehooks-ts';
import { Contact, keyPhoneBook } from './phonebook';

interface ContactFormProps {
    setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    contactToBeEdited?: Contact;
    setContactToBeEdited?: React.Dispatch<React.SetStateAction<Contact | null>>;
}

export function ContactForm({ setIsContactFormOpen, contactToBeEdited, setContactToBeEdited }: ContactFormProps) {

    const [contactList, setContactList] = useLocalStorage<Contact[]>(keyPhoneBook, [], undefined);

    const formik = useFormik({
        initialValues: {
            name: contactToBeEdited?.name ?? "",
            surname: contactToBeEdited?.surname ?? "",
            phonenumber: contactToBeEdited?.phonenumber ?? ""
        },
        onSubmit: (values) => {
            let newContactList: Contact[] = [...contactList];

            if (contactToBeEdited) {

                newContactList = contactList.map((contactListItem) => {

                    if (contactListItem.id == contactToBeEdited.id) {
                        contactListItem.name = values.name;
                        contactListItem.surname = values.surname;
                        contactListItem.phonenumber = values.phonenumber;
                    }

                    return contactListItem;
                });
            } else {

                newContactList.push({
                    id: contactList.length,
                    name: values.name,
                    surname: values.surname,
                    phonenumber: values.phonenumber
                });
            }

            setContactList(newContactList);

            if (setContactToBeEdited) {
                setContactToBeEdited(null);
            }

            setIsContactFormOpen(false);
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange} />
                <TextField
                    fullWidth
                    id="surname"
                    name="surname"
                    label="Surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange} />
                <TextField
                    fullWidth
                    id="phonenumber"
                    name="phonenumber"
                    label="Phonenumber"
                    value={formik.values.phonenumber}
                    onChange={formik.handleChange} />
                <Button fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}
