import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex list-none gap-1">
            {pageNumbers.map((pageNumber) => (
                <li
                    className={`w-10 text-center border-2 ${
                        pageNumber === currentPage
                            ? "border-secondary"
                            : "border-primary"
                    } text-text font-semibold px-1 rounded-md cursor-pointer bg-primary`}
                    onClick={() => paginate(pageNumber)}
                    key={pageNumber}
                >
                    {pageNumber}
                </li>
            ))}
        </nav>
    );
};

export default Pagination;
