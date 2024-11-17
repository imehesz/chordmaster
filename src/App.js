import React, { useState, useEffect, useRef } from 'react';
import SpeedControl from './components/SpeedControl';
import ChordDisplay from './components/ChordDisplay';
import { guitarChords } from './config';

import './App.css';

function App() {
    const [speed, setSpeed] = useState(1.0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentChord, setCurrentChord] = useState(null);
    const intervalRef = useRef(null);

    const getRandomChord = () => {
        const randomIndex = Math.floor(Math.random() * guitarChords.length);
        return guitarChords[randomIndex];
    };

    useEffect(() => {
        if (isPlaying) {
            setCurrentChord(getRandomChord());
            intervalRef.current = setInterval(() => {
                setCurrentChord(getRandomChord());
            }, speed * 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, speed]);

    return (
        <div className="App">
            <SpeedControl 
                speed={speed}
                setSpeed={setSpeed}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            <ChordDisplay currentChord={currentChord} />
        </div>
    );
}

export default App;