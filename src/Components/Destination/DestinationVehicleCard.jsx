import React from "react";
import { Card } from "react-bootstrap";
import peopleIcon from "./../../Resources/images/peopleicon.png";
import './DestinationVehicleCard.css'
const DestinationVehicleCard = ({ vehicle }) => {
  const { id, name, picture, rideCost } = vehicle;
  return (
    <Card
      className="m-2"
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="vehicle_info_part_1 d-flex align-items-center">
          <p className="rounded-circle" style={{ width: "60px" }}>
            <img className="img-fluid" src={picture} alt="vehicle" />
          </p>
          <p className="ml-2">{name || "data err"}</p>
          <div className="d-flex align-items-center ml-2">
            <img
              className="img-fluid"
              src={peopleIcon}
              alt="peopleIcon"
              style={{ width: "20px", height: "20px" }}
            />
            <p className="p-1">4</p>
          </div>
        </div>
        <div className="vehicle_info_part_2">
          <p>${rideCost}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DestinationVehicleCard;
