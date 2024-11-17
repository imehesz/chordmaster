import React from 'react';

const ChordDisplay = ({ currentChord }) => {
    return (
        <div className="chord-display">
            {currentChord && (
                <>
                    <div className="chord-name">
                        {currentChord.chord}
                    </div>
                    <div className="chord-image">
                        <img 
                            src={`/img/${currentChord.file}`} 
                            alt={`${currentChord.chord} chord`}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ChordDisplay;