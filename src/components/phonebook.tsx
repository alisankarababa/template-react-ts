import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContactForm } from './ContactForm';

export const keyPhoneBook = "phonebook";

export interface Contact {
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
                contactToBeEdited={contactToBeEdited}
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