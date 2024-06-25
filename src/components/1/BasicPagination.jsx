import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({setPage, page, totalPages }) {
    const handleChange = (e, pagetoselect) => {
        e.preventDefault()
      setPage(pagetoselect)
    }
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} color="primary" onChange={handleChange} page={page}/>
    </Stack>
  );
}
