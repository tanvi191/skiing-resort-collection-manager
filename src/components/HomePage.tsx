import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
            setIsPlaying(true);
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(error => {
                    console.error("Error attempting to play", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="home-page">
            <video ref={videoRef} loop muted playsInline className="background-video">
                <source src="/3658800221-preview.mp4" type="video/mp4" />
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









