import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useLocalStorage } from 'usehooks-ts'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const keyPhoneBook = "phonebook";

interface ContactFormProps {
    setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setContactList: React.Dispatch<React.SetStateAction<Contact[]>>;
    contactList: Contact[],
    contactToBeEdited?: Contact;
    setContactToBeEdited?: React.Dispatch<React.SetStateAction<Contact | null>>;
}

function ContactForm({setIsContactFormOpen, setContactList, contactList, contactToBeEdited, setContactToBeEdited}: ContactFormProps) {

    const formik = useFormik({
        initialValues: {
            name: contactToBeEdited?.name ?? "",
            surname: contactToBeEdited?.surname ?? "",
            phonenumber:contactToBeEdited?.phonenumber ?? ""
        },  
        onSubmit: (values) => {
            let newContactList: Contact[] = [...contactList];

            if(contactToBeEdited) {
                
                newContactList = contactList.map( (contactListItem) => {
                    
                    if(contactListItem.id == contactToBeEdited.id) {
                        contactListItem.name = values.name;
                        contactListItem.surname = values.surname;
                        contactListItem.phonenumber = values.phonenumber;
                    }
                    
                    return contactListItem;
                })
            } else {
                
                newContactList.push({
                    id: contactList.length,
                    name: values.name,
                    surname: values.surname,
                    phonenumber: values.phonenumber
                })
            }

            setContactList(newContactList);

            if(setContactToBeEdited) {
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
                    onChange={formik.handleChange}
                />
                <TextField
                    fullWidth
                    id="surname"
                    name="surname"
                    label="Surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                />
                <TextField
                    fullWidth
                    id="phonenumber"
                    name="phonenumber"
                    label="Phonenumber"
                    value={formik.values.phonenumber}
                    onChange={formik.handleChange}
                />
                <Button fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}

interface Contact {
    id: number,
    name: string;
    surname: string;
    phonenumber:string;
}

export default function DataGridDemo() {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [contactList, setContactList] = useLocalStorage<Contact[]>(keyPhoneBook, [], undefined)


    const [ contactToBeEdited, setContactToBeEdited ] = useState<Contact | null>(null);

    if(contactToBeEdited) {
        return(
            <ContactForm 
                setIsContactFormOpen={setIsFormOpen}
                setContactList={setContactList}
                contactList={contactList}
                contactToBeEdited={contactToBeEdited}
                setContactToBeEdited={setContactToBeEdited}
            />
        );
    }

    if(isFormOpen) {
        return(
            <ContactForm contactList={contactList} setContactList={setContactList} setIsContactFormOpen={setIsFormOpen}/>
        )
    }

    const columns: GridColDef<(Contact[])[number]>[] = [
        {
            field: 'id',
            headerName: "Id",
            width: 150,
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
        },
        {
          field: 'surname',
          headerName: 'Surname',
          width: 150,
        },
        {
          field: 'phonenumber',
          headerName: 'Phonenumber',
          width: 150,
        },
        {
          field: 'edit',
          renderCell: (cellValues) => {
              return (
                  <EditIcon onClick={
                    () => 
                        setContactToBeEdited({
                            id: cellValues.row.id,
                            name: cellValues.row.name,
                            surname: cellValues.row.surname,
                            phonenumber: cellValues.row.phonenumber,
                        })
                }/>
              );
          }
        },
        {
          field: 'delete',
          renderCell: (cellValues) => {
              return (
                  <DeleteIcon onClick={
                    () => setContactList((prev) => [...prev].filter((contact) => contact.id !== cellValues.id))
                }/>
              );
          }
        }
      ];


  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <Button onClick={() => setIsFormOpen(true)}>New</Button>
      <DataGrid
        rows={contactList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}