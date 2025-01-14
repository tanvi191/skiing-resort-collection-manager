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
                {/* Add more icons for other countries */}
            </div>
        </div>
    );
};

export default HomePage;