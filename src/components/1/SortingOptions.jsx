import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { capitaliseStr } from '../../../utils/capitaliseStr';

function getStyles(topic, pickedTopic, theme) {
    return {
      fontWeight:
      pickedTopic.indexOf(topic) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function SortingOptions({page, limit, setLimit, topics, setSortBy, sortBy, setOrder, order, setPickedTopic, pickedTopic}) {
    const theme = useTheme();
  

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  const handleChangeTopic = (event) => {
    setPickedTopic(event.target.value);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value)
  }

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 170 }}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort_by"
          onChange={handleChangeSortBy}
        >
          <MenuItem value={"votes"}>Votes</MenuItem>
          <MenuItem value={"created_at"}>Date</MenuItem>
          <MenuItem value={"comment_count"}>Comment count</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 170 }}>
        <InputLabel id="demo-simple-select-label">Order</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order}
          label="Order"
          onChange={handleChangeOrder}
        >
          <MenuItem value={"asc"}>Ascending</MenuItem>
          <MenuItem value={"desc"}>Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 170 }}>
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pickedTopic}
          label="Topic"
          onChange={handleChangeTopic}
        >
            {topics.map((element) => (
            <MenuItem
              key={element.slug}
              value={element.slug}
              style={getStyles(element.slug, pickedTopic, theme)}
            >
              {capitaliseStr(element.slug)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 170 }}>
        <InputLabel id="demo-simple-select-label">Articles per page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="Articles per page"
          onChange={handleChangeLimit}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={75}>75</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 100}}>
      <Button sx={{ height: 53 }} size='large' variant="contained" href={`/articles?topic=${pickedTopic}&sort_by=${sortBy}&order=${order}&limit=${limit}&p=${page}`}>Go</Button>
      </FormControl>
    </Box>
  );
}
