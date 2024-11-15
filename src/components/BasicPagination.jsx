import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function BasicPagination({ sortBy, order, limit, setSearchParams, page, setPage, totalPages }) {
  
  const params={}
    params.sort_by = sortBy ? sortBy : "created_at"
    params.order = order ? order : "desc"
    params.limit = limit ? limit : 10

  const handlePage = (value) => {
    params.p = Number(value)
    setSearchParams(params)
    setPage(Number(value))
  };
  
  return (
    <section className="flex justify-center">
    <Pagination count={totalPages} className="py-5 pb-10 dark:text-[#f8f8f2]" onChange={(event, value) => handlePage(value)} color='primary' 
    page={page}/>
    </section>
  );
}
