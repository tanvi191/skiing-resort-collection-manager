import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { skiResortService } from '../services/SkiResortService';
import { SkiResort } from '../types/SkiResort';

const DashboardSelector: React.FC = () => {
    const [resorts, setResorts] = useState<SkiResort[]>([]);
    const [selectedResort, setSelectedResort] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResorts = async () => {
            const fetchedResorts = await skiResortService.fetchSkiResorts();
            setResorts(fetchedResorts);
            if (fetchedResorts.length > 0) {
                setSelectedResort(fetchedResorts[0].id.toString());
            }
        };
        fetchResorts();
    }, []);

    return (
        <div className="dashboard-selector">
            <select value={selectedResort} onChange={handleSelectChange}>
                {resorts.map((resort) => (
                    <option key={resort.id} value={resort.id}>
                        {resort.Resort}
                    </option>
                ))}
            </select>
            <Link to="/" className="home-button">Back to Home</Link>
        </div>
    );
};

export default DashboardSelector;
