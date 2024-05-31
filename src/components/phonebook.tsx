import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';




interface ContactFormProps {
    setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    contact?: Contact;
    setContactToBeEdited?: React.Dispatch<React.SetStateAction<Contact | null>>;
}

function ContactForm({setIsContactFormOpen, contact, setContactToBeEdited}: ContactFormProps) {

    const formik = useFormik({
        initialValues: {
            name: contact?.name ?? "",
            surname: contact?.surname ?? "",
            phonenumber:contact?.phonenumber ?? ""
        },  
        onSubmit: (values) => {
            let contactList: Contact[] = JSON.parse(localStorage.getItem("phonebook") || "[]");

            if(contact) {
                
                contactList = contactList.map( (contactListItem) => {
                    
                    if(contactListItem.id == contact.id) {
                        contactListItem.name = values.name;
                        contactListItem.surname = values.surname;
                        contactListItem.phonenumber = values.phonenumber;
                    }
                    
                    return contactListItem;
                })
            } else {
                
                contactList.push({
                    id: contactList.length,
                    name: values.name,
                    surname: values.surname,
                    phonenumber: values.phonenumber
                })
            }

            localStorage.setItem("phonebook", JSON.stringify(contactList));

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

    const [ contactToBeEdited, setContactToBeEdited ] = useState<Contact | null>(null);
    const [ contactList, setContactList ] = useState([]);

    useEffect(() => {
        const contactListFromLocalStorage = JSON.parse(localStorage.getItem("phonebook") || "[]");
        setContactList(contactListFromLocalStorage);
    }, [isFormOpen, contactToBeEdited])

    if(contactToBeEdited) {
        return(
            <ContactForm 
                setIsContactFormOpen={setIsFormOpen}
                contact={contactToBeEdited}
                setContactToBeEdited={setContactToBeEdited}
            />
        );
    }

    if(isFormOpen) {
        return(
            <ContactForm setIsContactFormOpen={setIsFormOpen}/>
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