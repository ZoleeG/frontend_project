import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { capitaliseStr } from "../../utils/capitaliseStr";
import "../styles/Articles.css";

export default function SortingOptions({
  setSearchParams,
  setPage,
  limit,
  setLimit,
  setSortBy,
  sortBy,
  setOrder,
  order,
  topicQuery,
}) {

  const params={}
    params.sort_by = sortBy || "created_at"
    params.order = order ? order : "desc"
    params.limit = limit ? limit : 10

  const handleChangeSortBy = (event) => {
    setPage(1);
    setSortBy(event.target.value);
    params.sort_by = event.target.value
    setSearchParams(params)
  };

  const handleChangeOrder = (event) => {
    setPage(1);
    setOrder(event.target.value);
    params.order = event.target.value
    setSearchParams(params)
  };

  const handleChangeLimit = (event) => {
    setPage(1);
    setLimit(event.target.value)
    params.limit = event.target.value
    setSearchParams(params)
  };

  return (
    <div className="article-header">
      {topicQuery ? (
        <h2 id="articles-title">{capitaliseStr(topicQuery)} </h2>
      ) : (
        <h2 id="articles-title">All Articles</h2>
      )}
      <div className="query-forms">
        <FormControl
          variant="standard"
          sx={{ minWidth: 100, caretColor:"white" }}
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
            value={sortBy || ''}
            label="Sort_by"
            onChange={handleChangeSortBy}
          >
            <MenuItem value="created_at">Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="topic">Topic</MenuItem>
            <MenuItem value="comment_count">Comments</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ minWidth: 150 }}
          id="select-sortby"
          className="formControl"
        >
          <InputLabel id="artpp-label" className="dark:text-[#f8f8f2]">
            Articles per page
          </InputLabel>
          <Select
            className="select-form dark:text-[#f8f8f2] dark:border-red-400"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit || ''}
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
            value={order || ''}
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
