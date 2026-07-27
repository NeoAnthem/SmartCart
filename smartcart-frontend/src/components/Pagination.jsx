import {
    HiChevronLeft,
    HiChevronRight,
    HiChevronDoubleLeft,
    HiChevronDoubleRight
} from "react-icons/hi2";

function Pagination({

    currentPage,

    totalPages,

    setCurrentPage

}) {

    if (totalPages <= 1) {

        return null;
    }

const pages = [];

const startPage = Math.max(
    1,
    currentPage - 2
);

const endPage = Math.min(
    totalPages,
    currentPage + 2
);

for (

    let i = startPage;

    i <= endPage;

    i++

) {

    pages.push(i);

}

    return (

        <div className="pagination-container">

            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage(1)
                }
            >
                <HiChevronDoubleLeft />
            </button>

            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage(
                        currentPage - 1
                    )
                }
            >
                <HiChevronLeft />
            </button>

            {

                pages.map(page => (

                    <button
                        key={page}
                        className={
                            page === currentPage
                                ? "pagination-number active"
                                : "pagination-number"
                        }
                        onClick={() =>
                            setCurrentPage(page)
                        }
                    >
                        {page}
                    </button>

                ))

            }

            <button
                className="pagination-btn"
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    setCurrentPage(
                        currentPage + 1
                    )
                }
            >
                <HiChevronRight />
            </button>

            <button
                className="pagination-btn"
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    setCurrentPage(
                        totalPages
                    )
                }
            >
                <HiChevronDoubleRight />
            </button>

        </div>

    );
}

export default Pagination;