import React from 'react';
import albumCover from '../assets/music/album-cover/album_cover.jpg';
import spotifyLogo from '../assets/music/album-cover/spotify-logo.png';

interface SpotifyPlayerCardProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const SpotifyPlayerCard: React.FC<SpotifyPlayerCardProps> = ({
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
}) => {
  // Helper to format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  return (
    <div className="spotify-scrapbook-card">
      {/* Tape styling at the top to anchor it to the desk */}
      <div className="masking-tape tape-card-top"></div>

      <div className="spotify-card-header">
        <img src={spotifyLogo} alt="Spotify" className="spotify-card-logo" />
        <span className="spotify-card-playlist">Perfect Moments for Mae</span>
      </div>

      <div className="spotify-card-body">
        <img src={albumCover} alt="Album Art" className="spotify-card-art" />
        
        <div className="spotify-card-details">
          <h4 className="spotify-card-title">Perfect</h4>
          <span className="spotify-card-artist">Ed Sheeran</span>
        </div>
      </div>

      {/* Progress track */}
      <div className="spotify-card-progress">
        <input
          type="range"
          min="0"
          max={duration || 61}
          step="0.1"
          value={currentTime}
          onChange={handleSliderChange}
          className="spotify-card-slider"
          style={{
            background: `linear-gradient(to right, #1db954 0%, #1db954 ${
              (currentTime / (duration || 61)) * 100
            }%, #555 ${(currentTime / (duration || 61)) * 100}%, #555 100%)`,
          }}
        />
        <div className="spotify-card-times">
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime((duration || 61) - currentTime)}</span>
        </div>
      </div>

      {/* Play/Pause control center */}
      <div className="spotify-card-controls">
        <button
          type="button"
          className="spotify-card-play-btn"
          onClick={onTogglePlay}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SpotifyPlayerCard;
