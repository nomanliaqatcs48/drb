import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ServiceCard = () => {
  return (
    <div className="col-12 col-md-3 col-lg-2 mb-3">
      <Card
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ minHeight: 210 }}
      >
        <CardContent>
          <img
            src={
              "https://corporate.raseel.gift/hubfs/new%20employee%20kit%20blue.svg"
            }
            width={80}
            height={80}
          />
          <h5 className="mt-3">Lorem Ipsum</h5>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Services() {
  return (
    <div className="service-section mt-4">
      <div className="row justify-content-center">
        <div className="col-12 mb-3">
          <h1>Services</h1>
          <p className="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  );
}
