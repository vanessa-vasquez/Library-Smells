import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddRating from "./AddRating";
import Descriptors from "./Descriptors";
import AddDescriptor from "./AddDescriptor";
import ReactionImage from "./ReactionImage";
import "../styles/Library.css";

export default function Library(props) {
  const name = props.name;
  const [avgRating, setAvgRating] = useState(null);
  const [descriptors, setDescriptors] = useState({});

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="name">{name}</div>
        </Col>
        <Col md={4}></Col>
        <Col md={3}>
          {avgRating && (
            <div className="smell-rating">{avgRating} star smell</div>
          )}
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row>
        <Col md={12} className={"d-block d-sm-none"}>
          <ReactionImage avgRating={avgRating} />
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <AddRating name={name} setAvgRating={setAvgRating} />
          <Descriptors
            library={name}
            descriptors={descriptors}
            setDescriptors={setDescriptors}
          />
          <AddDescriptor library={name} setDescriptors={setDescriptors} />
        </Col>
        <Col md={1}></Col>
        <Col md={6} className={"d-none d-md-block"}>
          <ReactionImage avgRating={avgRating} />
        </Col>
      </Row>
    </Container>
  );
}
