import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/LibraryOptions.css";
import { NavLink } from "react-router-dom";

export default function LibraryOptions() {
  return (
    <Container>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <div className="select-header text-center">Select a library</div>
          <div className="options">
            <ul>
              <li>
                <NavLink to="/avery">
                  Avery Architectural and Fine Arts Library
                </NavLink>
              </li>
              <li>
                <NavLink to="/law">Law Library</NavLink>
              </li>
              <li>
                <NavLink to="/uris">
                  Business and Economics Library in Uris
                </NavLink>
              </li>
              <li>
                <NavLink to="/butler">Butler Library</NavLink>
              </li>
              <li>
                <NavLink to="/milstein">Milstein Library</NavLink>
              </li>
              <li>
                <NavLink to="/noco">
                  Science and Engineering Library (NoCo)
                </NavLink>
              </li>
              <li>
                <NavLink to="/east-asian">East Asian Library</NavLink>
              </li>
              <li>
                <NavLink to="/lehman">Lehman Social Sciences Library</NavLink>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}
