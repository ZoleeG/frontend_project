import * as React from "react";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../styles/Articles.css";

export default function CommentsSortingOptions({
  setCommentsPage,
  limit,
  setLimit,
  setSortBy,
  sortBy,
  setOrder,
  order
}) {
  const theme = useTheme();

  const handleChangeSortBy = (event) => {
    setCommentsPage(1);
    setSortBy(event.target.value);
  };

  const handleChangeOrder = (event) => {
    setCommentsPage(1);
    setOrder(event.target.value);
  };

  const handleChangeLimit = (event) => {
    setCommentsPage(1);
    setLimit(event.target.value);
  };

  return (
    <div className="article-header ">
      <div className="query-forms">
        <FormControl
          variant="standard"
          sx={{ minWidth: 100 }}
          id="select-sortby"
          className="formControl"
        >
          <InputLabel id="sortby-label" className="dark:text-[#f8f8f2]">
            Sort by
          </InputLabel>
          <Select
            className="select-form dark:text-[#f8f8f2] dark:border-red-400"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            label="Sort_by"
            onChange={handleChangeSortBy}
          >
            <MenuItem value="created_at">Date</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="comment_id">Comment ID</MenuItem>
            <MenuItem value="body_length">Length</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ minWidth: 150 }}
          id="select-sortby"
          className="formControl"
        >
          <InputLabel id="artpp-label" className="dark:text-[#f8f8f2]">
            Comments per page
          </InputLabel>
          <Select
            className="select-form dark:text-[#f8f8f2] dark:border-red-400"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Limit"
            onChange={handleChangeLimit}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ minWidth: 100 }}
          variant="standard"
          className="order-form"
        >
          <InputLabel id="order-label" className="dark:text-[#f8f8f2]">
            Order
          </InputLabel>
          <Select
            className="select-form dark:text-[#f8f8f2]"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={order}
            label="Order"
            onChange={handleChangeOrder}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
