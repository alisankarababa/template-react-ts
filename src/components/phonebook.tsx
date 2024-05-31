import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Surname',
    width: 150,
  },
  {
    field: 'phonenumber',
    headerName: 'Phonenumber',
    width: 150,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', name: 'Jon', phonenumber:"0000000" },
  { id: 2, lastName: 'Lannister', name: 'Cersei', phonenumber:"0000000" },
  { id: 3, lastName: 'Lannister', name: 'Jaime', phonenumber:"0000000" },
  { id: 4, lastName: 'Stark', name: 'Arya', phonenumber:"0000000" },
  { id: 5, lastName: 'Targaryen', name: 'Daenerys', phonenumber:"0000000" },
  { id: 6, lastName: 'Melisandre', name: null, phonenumber:"0000000" },
  { id: 7, lastName: 'Clifford', name: 'Ferrara', phonenumber:"0000000" },
  { id: 8, lastName: 'Frances', name: 'Rossini', phonenumber:"0000000" },
  { id: 9, lastName: 'Roxie', name: 'Harvey', phonenumber:"0000000" },
];

interface ContactFormProps {
    setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactForm({setIsContactFormOpen}: ContactFormProps) {

    const formik = useFormik({
        initialValues: {
            name: "",
            surname:"",
            phonenumber:""
        },
        onSubmit: (values) => {
            const contactList = JSON.parse(localStorage.getItem("phonebook") || "[]");
            contactList.push({
                id: contactList.length,
                name: values.name,
                surname: values.surname,
                phonenumber: values.phonenumber
            })
            localStorage.setItem("phonebook", JSON.stringify(contactList));
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

export default function DataGridDemo() {

    const [isFormOpen, setIsFormOpen] = useState(false);

    if(isFormOpen) {
        return(
            <ContactForm setIsContactFormOpen={setIsFormOpen}/>
        )
    }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <Button onClick={() => setIsFormOpen(true)}>New</Button>
      <DataGrid
        rows={rows}
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