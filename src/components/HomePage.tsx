import React from 'react';
import { Link } from 'react-router-dom';
// import worldMap from '../assets/world-map.png';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Ski Resort Manager</h1>
            <div className="world-map-container">
                <video autoPlay loop muted className="world-map-video">
                    <source src="/3593892521-preview.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="map-icon" style={{ top: '40%', left: '48%' }}>
                    <Link to="/resorts?country=Austria">🏔️</Link>
                </div>
                <div className="map-icon" style={{ top: '38%', left: '46%' }}>
                    <Link to="/resorts?country=Belgium">🏔️</Link>
                </div>
                {/* Add more icons for other countries */}
            </div>
            <div className="options">
                <Link to="/resorts" className="option-button">View All Resorts</Link>
                <Link to="/dashboard" className="option-button">View Dashboard</Link>
                <Link to="/add-resort" className="option-button">Add New Resort</Link>
                <Link to="/remove-resort" className="option-button">Remove Resort</Link>
            </div>
        </div>
    );
};

export default HomePage;



