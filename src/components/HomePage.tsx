import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="home-page">
            <video ref={videoRef} loop muted playsInline className="background-video">
                <source src="/3658800221-preview (1).mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <button onClick={togglePlay} className="play-pause-btn">
                {isPlaying ? 'Pause' : 'Play'} Animation
            </button>
            <div className="content">
                <h1>Ski Resort Manager</h1>
                <div className="options">
                    <Link to="/resorts" className="option-button">View All Resorts</Link>
                    <Link to="/dashboard" className="option-button">View Dashboard</Link>
                    <Link to="/add-resort" className="option-button">Add New Resort</Link>
                    <Link to="/remove-resort" className="option-button">Remove Resort</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;







