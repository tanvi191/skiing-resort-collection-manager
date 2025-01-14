import React from 'react';
import { Link } from 'react-router-dom';
import worldMap from '../assets/world-map.png';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Ski Resort Manager</h1>
            <div className="world-map-container">
                <img src={worldMap} alt="World Map" className="world-map" />
                <div className="map-icon" style={{ top: '30%', left: '48%' }}>
                    <Link to="/resorts?country=Austria">🏔️</Link>
                </div>
                <div className="map-icon" style={{ top: '32%', left: '46%' }}>
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

