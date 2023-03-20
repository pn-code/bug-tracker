import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            {pageNumbers.map((pageNumber) => (
                <li onClick={() => paginate(pageNumber)} key={pageNumber}>{pageNumber}</li>
            ))}
        </nav>
    );
};

export default Pagination;
