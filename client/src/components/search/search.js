import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./search.css";

export const Search = ({ handleSearch }) => {
  return (
    <div>
      <InputGroup className="mb-3 search-box">
        <Form.Control
          placeholder="Search Transaction"
          aria-label="Search Transaction"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </InputGroup>
    </div>
  );
};
