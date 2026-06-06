import React from 'react';
import gramophoneImg from '../assets/vintage_gramophone.png';

interface GramophonePlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const GramophonePlayer: React.FC<GramophonePlayerProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <div className="gramophone-fixed-container">
      <div 
        className={`gramophone-wrapper ${isPlaying ? 'playing' : ''}`} 
        onClick={onTogglePlay}
        title={isPlaying ? "Click to Pause Music" : "Click to Play Music"}
      >
        {/* Needle/Arm overlay */}
        <div className="gramophone-needle"></div>

        {/* Vintage sketch image */}
        <img 
          src={gramophoneImg} 
          alt="Vintage Gramophone" 
          className="gramophone-image"
        />

        {/* Interactive sound wave rings when playing */}
        {isPlaying && (
          <div className="gramophone-soundwaves">
            <div className="ring ring1"></div>
            <div className="ring ring2"></div>
          </div>
        )}
      </div>

      <div className="gramophone-instruction">
        <span className="gramophone-note">Press play before reading.</span>
      </div>
    </div>
  );
};

export default GramophonePlayer;
