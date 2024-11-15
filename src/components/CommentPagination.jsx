import { Pagination } from "@mui/material"

export default function CommentPagination({commentsPage, setCommentsPage, totalPages}) {

    function handlePage(value) {
        setCommentsPage(value)
    }

    return (
        <section className="flex justify-center">
            <Pagination count={totalPages} className="py-5 pb-10 dark:text-[#f8f8f2]" color='primary' 
            page={commentsPage}
            onChange={(event, value) => handlePage(value)}
            /> 
        </section>
    )
}