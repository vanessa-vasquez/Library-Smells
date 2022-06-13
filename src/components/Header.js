import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import '../styles/Header.css';

export default function Header() {
  return (
    <Container>
        <Row>
            <Col md={2}></Col>
            <Col xs={12} md={8}>
                <div className="header">
                    <div className='l'>l</div>
                    <div className='i'>i</div>
                    <div className='b'>b</div>
                    <div className='r'>r</div>
                    <div className='a'>a</div>
                    <div className='r'>r</div>
                    <div className='y'>y</div>
                </div>
                <div className='header'>
                    <div className='s'>s</div>
                    <div className='m'>m</div>
                    <div className='e'>e</div>
                    <div className='l'>l</div>
                    <div className='l'>l</div>
                    <div className='s'>s</div>
                </div>
                <div className='sub-header'>
                    just CU shit.
                </div>
            </Col>
            <Col md={2}></Col>
        </Row>
    </Container>
  )
}
