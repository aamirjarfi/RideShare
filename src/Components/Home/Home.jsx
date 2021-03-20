import React from "react";
import "./Home.css";
import VehicleCard from "./../VehicleCard/VehicleCard";
import { Col, Container, Row } from "react-bootstrap";
import { jsonData } from "./../../Resources/JsonData/JsonData";
const Home = () => {
  return (
    <>
      <section id="home_section">
        {/* cards */}
        <Container
          className="d-flex align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <Row className="d-flex align-items-center justify-content-center">
            {jsonData.map((Vehicle) => {
              const { id, name, picture } = Vehicle;
              return (
                <Col xs={6} md={4} lg={3} key={id}>
                  <VehicleCard img={picture} vehicleName={name} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
