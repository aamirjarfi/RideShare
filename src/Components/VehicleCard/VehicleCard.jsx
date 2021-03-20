import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./VehicleCard.css";
const VehicleCard = ({ img, vehicleName }) => {
  return (
    <Link to={`destination/${vehicleName.toString().toLowerCase()}`}>
      <Card
        className="text-center hover_style_apply m-3"
        style={{ maxWidth: "13rem" }}
      >
        <Card.Img
          variant="center"
          src={img}
          className="px-3 pt-3 img-fluid mx-auto"
        />
        <Card.Body>
          <span className="responsive_font text-danger">{vehicleName}</span>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default VehicleCard;
