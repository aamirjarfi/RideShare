import React, { useEffect, useState } from "react";
import "./Destination.css";
import { useParams } from "react-router";
import { jsonData } from "./../../Resources/JsonData/JsonData";
import mapImg from "./../../Resources/images/Map.png";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import moment from "moment";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { validationSuite } from "./Validation/validationSuite";
import DestinationVehicleCard from "./DestinationVehicleCard";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
const Destination = () => {
  const [vehicleData, setVehicleData] = useState({});

  const { vehicleName } = useParams();
  useEffect(() => {
    const filterVehicleName = jsonData.filter(
      (d) => d.name.toLowerCase() === vehicleName.toString().toLowerCase()
    );
    console.log(filterVehicleName);
    setVehicleData(filterVehicleName);
  }, [vehicleName]);

  const { handleSubmit, register, errors, reset } = useForm({
    resolver: vestResolver(validationSuite),
  });

  const [destinationData, setDestinationData] = useState({});

  const showError = (errName) => errName && errName.message;

  console.log(errors);

  return (
    <>
      <hr />
      <Container className="d-flex flex-column flex-lg-row justify-content-center mt-2 mb-3">
        <div className="p-4" style={{ maxWidth: "100vw" }}>
          {destinationData.pickFrom ? (
            <div className="w-100">
            <Card>
              <Card.Body className="bg-dark text-start">
                <div className="bg-danger">
                  <Timeline>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h4>{destinationData.pickFrom}</h4>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem className="control_height">
                      <TimelineDot />
                      <TimelineContent>
                        <h4>{destinationData.pickTo}</h4>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
                <div>
                  <>
                    {vehicleData.map((vehicle) => {
                      return (
                        <section key={vehicle.id}>
                          <DestinationVehicleCard vehicle={vehicle} />
                          <DestinationVehicleCard vehicle={vehicle} />
                          <DestinationVehicleCard vehicle={vehicle} />
                        </section>
                      );
                    })}
                  </>
                </div>
              </Card.Body>
            </Card>
            </div>
          ) : (
            <div className="w-100">
              <Card className="rounded" style={{ backgroundColor: "#EFEFEF" }}>
                <Card.Body>
                  <Form
                    onSubmit={handleSubmit((data) => {
                      setDestinationData(data);
                      reset();
                    })}
                  >
                    <Form.Group>
                      <Form.Label className="d-flex justify-content-between">
                        <span>Pick From</span>
                        <span className="text-danger">
                          {showError(errors.pickFrom)}
                        </span>
                      </Form.Label>
                      <FormControl name="pickFrom" ref={register}></FormControl>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="d-flex justify-content-between">
                        <span>Pick From Date</span>
                        <span className="text-danger">
                          {showError(errors.pickFromDate)}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="date"
                        defaultValue={moment().format("YYYY-MM-DD")}
                        name="pickFromDate"
                        ref={register}
                      ></FormControl>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="d-flex justify-content-between">
                        <span>Pick To</span>
                        <span className="text-danger">
                          {showError(errors.pickTo)}
                        </span>
                      </Form.Label>
                      <FormControl name="pickTo" ref={register}></FormControl>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="d-flex justify-content-between">
                        <span>Pick To Date</span>
                        <span className="text-danger">
                          {showError(errors.pickToDate)}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="date"
                        name="pickToDate"
                        ref={register}
                      ></FormControl>
                    </Form.Group>
                    <Button type="submit" variant="danger" className="w-100">
                      Search
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
        <div style={{ maxWidth: "765px" }}>
          <img src={mapImg} className="img-fluid" alt="map" />
        </div>
      </Container>
    </>
  );
};

export default Destination;

/***
 * {destinationData.pickFrom && (
            <Card style={{ width: "400px" }}>
              <Card.Body className="text-center">
                <p>{destinationData.pickFrom}</p>
                <p>{destinationData.pickTo}</p>
                <div>
                  <>
                    {vehicleData.map((vehicle) => {
                      return (
                        <>
                          <DestinationVehicleCard vehicle={vehicle} />
                          <DestinationVehicleCard vehicle={vehicle} />
                          <DestinationVehicleCard vehicle={vehicle} />
                        </>
                      );
                    })}
                  </>
                </div>
              </Card.Body>
            </Card>
          )}
 */
