import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';

import './SpeedControl.css';

const SpeedControl = ({ speed, setSpeed, isPlaying, setIsPlaying, progress }) => {
    const handleSpeedChange = (newSpeed) => {
        if (newSpeed < 0) return setSpeed(0);
        if (newSpeed > 10) return setSpeed(10);
        setSpeed(Number(newSpeed.toFixed(1)));
    };

    return (
        <Row className="justify-content-center mb-4">
            <Col md={6}>
                <div className="d-flex align-items-center justify-content-center gap-3">
                    <Button 
                        variant="outline-primary"
                        onClick={() => handleSpeedChange(speed - 0.1)}
                    >-</Button>
                    
                    <h4 className="mb-3 text-center">{speed} seconds</h4>
                    
                    <Button 
                        variant="outline-primary"
                        onClick={() => handleSpeedChange(speed + 0.1)}
                    >+</Button>
                </div>
                <div className="mt-2 mb-3">
                    <div className="custom-progress-bar" style={{width:progress + '%'}}></div>
                </div>
                <div className="text-center mt-3">
                    <Button 
                        variant={isPlaying ? "danger" : "success"}
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? 'STOP' : 'START'}
                    </Button>
                </div>
            </Col>
        </Row>
    );
};
export default SpeedControl;