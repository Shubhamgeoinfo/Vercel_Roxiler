import { Image, Table as ReactTable } from "react-bootstrap";
import React from "react";
import "./table.css";

export const Table = ({ data }) => {
  return (
    <div>
      <ReactTable striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className="table-data">
          {data.map((currentData) => (
            <tr>
              <td>{currentData.id}</td>
              <td>{currentData?.title}</td>
              <td>{currentData?.description}</td>
              <td>{currentData?.price}</td>
              <td>{currentData?.category}</td>
              <td>{currentData?.sold ? "Yes" : "No"}</td>
              <td>
                <Image
                  src={currentData?.image}
                  alt={currentData?.title}
                  height={70}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </ReactTable>
    </div>
  );
};
