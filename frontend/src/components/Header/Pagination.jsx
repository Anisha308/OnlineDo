import React from "react";
const ITEMS_PER_PAGE = 6;

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const isLastPage = currentPage === totalPages;

  return (
    <div>
      <div className="mt-auto mb-4">
        <nav>
          <ul className="flex ">
            <li>
              <a
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                  isLastPage ? "disabled" : ""
                }`}
                href="#"
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                aria-label="Previous"
                disabled={currentPage === 1}
              >
                <span className="material-icons text-sm">
                  keyboard_arrow_left
                </span>
              </a>
            </li>
            {[...Array(Math.ceil(totalPages))].map((page, index) => (
              <li key={index}>
                <a
                  className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 p-0 text-sm text-black shadow-md transition duration-150 ease-in-out"
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                href="#"
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                aria-label="Next"
                disabled={isLastPage}
              >
                <span className="material-icons text-sm">
                  keyboard_arrow_right
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </div>
    </div>
  );
};

export default Pagination;
