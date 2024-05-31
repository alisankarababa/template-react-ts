import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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