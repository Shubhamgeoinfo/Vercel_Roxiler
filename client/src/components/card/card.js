import React from "react";
import Card from "react-bootstrap/Card";
import "./card.css";
import months from "../../data/months";

export const CardBox = ({ statsData, month }) => {
  return (
    <div>
      <Card className="card-wrapper">
        <Card.Body>
          <Card.Title>Statistics - {months[month]}</Card.Title>
          <Card.Text className="card-text-wrapper">
            <div>Total sale </div>
            <div>{statsData[0]?.totalSoldPrice}</div>
          </Card.Text>
          <Card.Text className="card-text-wrapper">
            <div>Total sold item</div> <div>{statsData[0]?.totalSoldCount}</div>
          </Card.Text>
          <Card.Text className="card-text-wrapper">
            <div>Total not sold item</div>{" "}
            <div>{statsData[0]?.totalNotSoldCount}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
