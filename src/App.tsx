import { useState, useRef, useEffect } from 'react';
import GramophonePlayer from './components/GramophonePlayer';
import SpotifyPlayerCard from './components/SpotifyPlayerCard';
import FallingPetals from './components/FallingPetals';
import flower1 from './assets/flowers/flower1.png';
import flower2 from './assets/flowers/flower2.png';
import flower3 from './assets/flowers/flower3.png';
import flower4 from './assets/flowers/flower4.png';
import mae1 from './assets/photos/mae_1.jpeg';
import mae2 from './assets/photos/mae_2.jpeg';
import perfectMp3 from './assets/music/Ed Sheeran - Perfect_100_201.mp3';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(61);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Playback blocked by browser autoplay policy:', err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 61);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <>
      {/* HTML5 Audio Core */}
      <audio
        ref={audioRef}
        src={perfectMp3}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Drifting Botanical Leaves & Rose Petals */}
      <FallingPetals />

      {/* Film Grain & Noise Overlay */}
      <div className="film-grain"></div>

      {/* Main Scrapbook Scroll Container */}
      <div className="scrapbook-viewport">
        
        {/* Vintage Desk Background Sheet */}
        <div className="scrapbook-desk">
          
          {/* ==========================================
              PAGE 1: INTRODUCTION
              ========================================== */}
          <section className="scrapbook-page page-intro">
            {/* Vintage Stamp / Postal Mark */}
            <div className="vintage-postmark">
              <span>RM</span>
              <span>06.05</span>
            </div>

            <div className="intro-title-wrapper">
              <h1 className="scrapbook-title">The Beautiful Accident</h1>
              <span className="scrapbook-date">May 6, 2026</span>
            </div>

            <div className="intro-text">
              <p className="cursive-text ink-bleed-1">
                Last month on this day,
              </p>
              <p className="cursive-text ink-bleed-2" style={{ textIndent: '30px' }}>
                I accidentally found a pretty girl.
              </p>
              <p className="serif-body-text fading-text">
                I never imagined that one conversation could become my favorite part of the day.
              </p>
            </div>

            {/* Embedded Spotify Player Card (Tilted) */}
            <SpotifyPlayerCard
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />

            {/* Dried Botanical Flower placed at the bottom */}
            <img 
              src={flower4} 
              alt="Pressed Wildflower" 
              className="pressed-flower-stamp position-1"
            />
          </section>

          {/* ==========================================
              PAGE 2: PHOTO COLLAGE (POLAROIDS ON DESK)
              ========================================== */}
          <section className="scrapbook-page page-photos">
            <h2 className="scrapbook-section-title">Captured Pages</h2>
            
            <div className="photo-collage-area">
              
              {/* Polaroid 1 (Mae 1) */}
              <div className="polaroid-scrapbook card-rotated-left">
                {/* Masking tape header */}
                <div className="masking-tape tape-top"></div>
                
                <div className="polaroid-inner">
                  <div className="polaroid-img-frame">
                    <img src={mae1} alt="Mae" />
                    <div className="polaroid-glare"></div>
                  </div>
                  <p className="polaroid-handwriting">I still remember this.</p>
                </div>

                {/* Pressed flower sticking out underneath Polaroid 1 */}
                <img 
                  src={flower3} 
                  alt="Pressed Flower Decoration" 
                  className="pressed-flower-overlap-left"
                />
              </div>

              {/* Polaroid 2 (Mae 2) */}
              <div className="polaroid-scrapbook card-rotated-right">
                {/* Masking tape angle */}
                <div className="masking-tape tape-corner"></div>
                
                <div className="polaroid-inner">
                  <div className="polaroid-img-frame">
                    <img src={mae2} alt="Mae" />
                    <div className="polaroid-glare"></div>
                  </div>
                  <p className="polaroid-handwriting">You looked beautiful here.</p>
                </div>

                {/* Pressed flower sticking out underneath Polaroid 2 */}
                <img 
                  src={flower1} 
                  alt="Pressed Flower Overlay" 
                  className="pressed-flower-overlap-right"
                />
              </div>

            </div>
          </section>

          {/* ==========================================
              PAGE 3: THE JOURNAL ENTRY
              ========================================== */}
          <section className="scrapbook-page page-journal">
            
            {/* Torn Notepad Paper Sheet */}
            <div className="torn-notebook-paper">
              {/* Torn spiral holes at the top */}
              <div className="notebook-spiral-holes">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="spiral-hole"></div>
                ))}
              </div>

              {/* Coffee Stain Ring */}
              <div className="coffee-stain"></div>

              {/* Journal Body */}
              <div className="notebook-content">
                <span className="notebook-date-hand">May 2026</span>
                
                <p className="notebook-salutation">Mae,</p>
                
                <p className="notebook-para">
                  You're genuinely one of the most wonderful people I've met.
                </p>
                
                <p className="notebook-para">
                  You somehow made ordinary days feel exciting.
                </p>
                
                <p className="notebook-para">
                  Every random conversation became something I looked forward to.
                </p>
                
                <p className="notebook-para">
                  I'm grateful that life accidentally introduced us.
                </p>
              </div>

              {/* Flower resting on the notebook journal page */}
              <img 
                src={flower4} 
                alt="Flower on journal" 
                className="journal-flower-accent"
              />
            </div>
          </section>

          {/* ==========================================
              PAGE 4: MEMORY FRAGMENTS
              ========================================== */}
          <section className="scrapbook-page page-fragments">
            <h2 className="scrapbook-section-title">Fragments of Thoughts</h2>
            
            <div className="fragments-grid">
              
              {/* Fragment 1: Tea-stained scrap */}
              <div className="memory-fragment fragment-1">
                <div className="paperclip-svg">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 9v7c0 2.2 1.8 4 4 4s4-1.8 4-4V7c0-1.65-1.35-3-3-3s-3 1.35-3 3v9c0 1.1.9 2 2 2s2-.9 2-2V9" />
                  </svg>
                </div>
                <p className="fragment-cursive">Still smiling because of that conversation.</p>
              </div>

              {/* Fragment 2: Grid post-it */}
              <div className="memory-fragment fragment-2">
                <div className="tape-small"></div>
                <p className="fragment-typewriter">I never expected this.</p>
              </div>

              {/* Fragment 3: Dried rose background scrap */}
              <div className="memory-fragment fragment-3">
                <p className="fragment-cursive">You made this month beautiful.</p>
                <img src={flower3} alt="Flower scrap" className="fragment-flower" />
              </div>

              {/* Fragment 4: Kraft paper note */}
              <div className="memory-fragment fragment-4">
                <p className="fragment-typewriter">Maybe beautiful accidents are the best kind.</p>
              </div>

            </div>
          </section>

          {/* ==========================================
              PAGE 5: ENDING / SIGN-OFF
              ========================================== */}
          <section className="scrapbook-page page-ending">
            <div className="ending-paper">
              <h2 className="ending-title">Happy One Month, Mae.</h2>
              
              <p className="ending-body cursive-text">
                I loved spending this month with you.
              </p>
              <p className="ending-body cursive-text">
                I hope this is only the beginning.
              </p>

              <div className="ending-signature">
                <span className="sig-label">With warmth,</span>
                <span className="signature-name">Abhin</span>
              </div>

              {/* Final single dried rose bloom */}
              <img 
                src={flower2} 
                alt="Rose pressed signature" 
                className="pressed-rose-outro"
              />
            </div>
          </section>

        </div>
      </div>

      {/* Floating Vintage Gramophone Player */}
      <GramophonePlayer isPlaying={isPlaying} onTogglePlay={togglePlay} />
    </>
  );
}

export default App;
