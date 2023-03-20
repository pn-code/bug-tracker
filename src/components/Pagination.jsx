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
                            ? "border-green-400"
                            : "border-gray-400"
                    } text-green-600 font-semibold px-1 rounded-md cursor-pointer`}
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
