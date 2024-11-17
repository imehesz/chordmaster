import React, { useState, useEffect, useRef } from 'react';
import SpeedControl from './components/SpeedControl';
import ChordDisplay from './components/ChordDisplay';
import { guitarChords } from './config';
import { Container, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [speed, setSpeed] = useState(1.0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentChord, setCurrentChord] = useState(null);
    const [chordType, setChordType] = useState('all');
    const [progress, setProgress] = useState(0);
    const progressInterval = useRef(null);
    const intervalRef = useRef(null);

    const getFilteredChords = () => {
        if (chordType === 'all') return guitarChords;
        return guitarChords.filter(chord => chord.type === chordType);
    };

    const getRandomChord = () => {
        const filteredChords = getFilteredChords();
        const randomIndex = Math.floor(Math.random() * filteredChords.length);
        return filteredChords[randomIndex];
    };

    useEffect(() => {
        if (isPlaying) {
            setCurrentChord(getRandomChord());
            
            // Progress bar update
            const updateProgress = () => {
                const startTime = Date.now();
                progressInterval.current = setInterval(() => {
                    const elapsedTime = Date.now() - startTime;
                    const newProgress = (elapsedTime / (speed * 1000)) * 100;
                    setProgress(Math.min(newProgress, 100));
                }, 100);
            };

            // Chord update
            intervalRef.current = setInterval(() => {
                setCurrentChord(getRandomChord());
                setProgress(0);
                clearInterval(progressInterval.current);
                updateProgress();
            }, speed * 1000);

            // Initial progress bar
            updateProgress();
        } else {
            clearInterval(intervalRef.current);
            clearInterval(progressInterval.current);
            setProgress(0);
        }

        return () => {
            clearInterval(intervalRef.current);
            clearInterval(progressInterval.current);
        };
    }, [isPlaying, speed, chordType]);

    return (
        <Container className="py-4">
            <div className='settings-wrapper'>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Select 
                                size="lg"
                                value={chordType} 
                                onChange={(e) => setChordType(e.target.value)}
                            >
                                <option value="all">All Chords</option>
                                <option value="major">Major Chords</option>
                                <option value="minor">Minor Chords</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <SpeedControl 
                    speed={speed}
                    setSpeed={setSpeed}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    progress={progress}
                />
            </div>
            <ChordDisplay currentChord={currentChord} />
        </Container>
    );
}

export default App;