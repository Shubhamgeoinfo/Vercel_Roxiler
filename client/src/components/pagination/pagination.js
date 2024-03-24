import React from "react";
import "./pagination.css";

const Pagination = ({ pageNo, count, handlePageChange }) => {
  return (
    <div className="pagination-container">
      <p>Page no {pageNo + 1}</p>
      <div className="button-group">
        <div
          role="button"
          className="pagination-button"
          onClick={() => {
            handlePageChange(pageNo - 1);
          }}
        >
          Prev
        </div>
        <div
          role="button"
          className="pagination-button"
          onClick={() => {
            handlePageChange(pageNo + 1);
          }}
        >
          Next
        </div>
      </div>
      <p>Per Page {count} </p>
    </div>
  );
};

export default Pagination;
