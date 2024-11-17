import React from 'react';

const SpeedControl = ({ speed, setSpeed, isPlaying, setIsPlaying }) => {
    const handleSpeedChange = (newSpeed) => {
        if (newSpeed < 0) return setSpeed(0);
        if (newSpeed > 10) return setSpeed(10);
        setSpeed(Number(newSpeed.toFixed(1)));
    };

    const increaseSpeed = () => {
        handleSpeedChange(speed + 0.1);
    };

    const decreaseSpeed = () => {
        handleSpeedChange(speed - 0.1);
    };

    const handleInputChange = (e) => {
        handleSpeedChange(Number(e.target.value));
    };

    return (
        <div className="speed-control">
            <div className="speed-inputs">
                <label htmlFor="speed">Speed:</label>
                <input 
                    type="number" 
                    id="speed"
                    value={speed}
                    step="0.1"
                    onChange={handleInputChange}
                />
                <button onClick={increaseSpeed}>+</button>
                <button onClick={decreaseSpeed}>-</button>
            </div>
            <div className="speed-display">
                Current Speed: {speed} seconds
            </div>
            <button onClick={() => setIsPlaying(!isPlaying)} className="toggle-button">
                {isPlaying ? 'STOP' : 'START'}
            </button>
        </div>
    );
};

export default SpeedControl;
