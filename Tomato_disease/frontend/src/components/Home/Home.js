import React, { useState } from "react";
import "./Home.css";
import C1 from "./assets/C1.jpg";
import C2 from "./assets/C2.jpg";
import C3 from "./assets/C3.jpg";
import { Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const navigate = useNavigate();
  const navigateDiagnose = () => {
    navigate("/diagnose");
  };
  const navigateHome = () => {
    if (props.name) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="shadow">
      <Carousel.Item className="item">
        <img className="d-block w-100" src={C1} alt="First slide" />
        <Carousel.Caption className="caption">
          <h3>{props.name ? `Welcome - ${props.name}` : "Welcome"}</h3>
          <p>
            We are here to help you identify and diagnose diseases that may be
            affecting your plants.
          </p>
          <div className={"hero-btns-container"}>
            <Button
              className="a"
              onClick={navigateHome}
              variant="outline-warning"
            >
              Get Started
            </Button>
            <Button
              className="a"
              variant="outline-info"
              onClick={navigateDiagnose}
            >
              Diagnose
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="item">
        <img className="d-block w-100" src={C2} alt="Second slide" />

        <Carousel.Caption className="caption">
          <h3>{props.name ? `Welcome - ${props.name}` : "Welcome"}</h3>
          <p>
            Our platform uses advanced image processing and machine learning
            algorithms to analyze images of your plants and accurately detect
            any signs of disease.
          </p>
          <div className={"hero-btns-container"}>
            <Button
              className="a"
              onClick={navigateHome}
              variant="outline-warning"
            >
              Get Started
            </Button>
            <Button
              className="a"
              variant="outline-info"
              onClick={navigateDiagnose}
            >
              Diagnose
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="item">
        <img className="d-block w-100" src={C3} alt="Third slide" />

        <Carousel.Caption className="caption">
          <h3>{props.name ? `Welcome - ${props.name}` : "Welcome"}</h3>
          <p>
            Our goal is to help you keep your plants healthy and thriving. By
            identifying and treating diseases early on, you can prevent them
            from spreading
          </p>
          <div className={"hero-btns-container"}>
            <Button
              className="a"
              onClick={navigateHome}
              variant="outline-warning"
            >
              Get Started
            </Button>
            <Button
              className="a"
              variant="outline-info"
              onClick={navigateDiagnose}
            >
              Diagnose
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export function Home(props) {
  return (
    <div>
      <ControlledCarousel name={props.name} />
    </div>
  );
}

export default Home;
