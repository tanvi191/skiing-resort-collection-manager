import React, { useEffect, useState } from 'react';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';
import { Link } from 'react-router-dom';

const SkiResortList: React.FC = () => {
    const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);

    useEffect(() => {
        const fetchResorts = async () => {
            const resorts = await skiResortService.fetchSkiResorts();
            setSkiResorts(resorts);
        };
        fetchResorts();
    }, []);

    return (
        <div className="ski-resort-list">
            <h1>Ski Resorts</h1>
            <div className="resort-grid">
                {skiResorts.map((resort) => (
                    <Link to={`/resort/${resort.id}`} key={resort.id} className="resort-card">
                        <h2>{resort.Resort}</h2>
                        <p>{resort.Country}</p>
                        <p>Total Slope: {resort.TotalSlope} km</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};