import React, { useEffect, useState } from 'react';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';
import { Link } from 'react-router-dom';

const SkiResortList: React.FC = () => {
    const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);

    useEffect(() => {
        const fetchResorts = async () => {
            console.log('Fetching resorts...');
            const resorts = await skiResortService.fetchSkiResorts();
            console.log('Fetched resorts:', resorts);
            setSkiResorts(resorts);
        };
        fetchResorts();
    }, []);

    console.log('Rendering SkiResortList, skiResorts:', skiResorts);

    return (
        <div className="ski-resort-list">
            <h1>Ski Resorts</h1>
            <div className="resort-grid">
                {skiResorts.map((resort) => (
                    <Link to={`/resort/${resort.id}`} key={resort.id} className="resort-card">
                        <h2>{resort.Resort || 'Unknown Resort'}</h2>
                        <p>{resort.Country || 'Unknown Country'}</p>
                        <p>Total Slope: {resort.TotalSlope || 'N/A'} km</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SkiResortList;



