import React from "react";
import Form from "react-bootstrap/Form";
import months from "../../data/months";
import "./select.css";
export const Select = ({ handleChange, value }) => {
  return (
    <div className="select-container">
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={value}
      >
        {Object.entries(months).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </Form.Select>
    </div>
  );
};
