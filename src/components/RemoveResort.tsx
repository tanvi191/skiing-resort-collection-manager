import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skiResortService } from '../services/SkiResortService';
import { SkiResort } from '../types/SkiResort';

const RemoveResort: React.FC = () => {
    const [resorts, setResorts] = useState<SkiResort[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResorts = async () => {
            const fetchedResorts = await skiResortService.fetchSkiResorts();
            setResorts(fetchedResorts);
        };
        fetchResorts();
    }, []);

    const handleRemove = (id: number) => {
        skiResortService.removeSkiResort(id);
        setResorts(resorts.filter(resort => resort.id !== id));
    };

    return (
        <div className="remove-resort">
            <h2>Remove Ski Resort</h2>
            {resorts.length === 0 ? (
                <p>No ski resorts available.</p>
            ) : (
                <ul>
                    {resorts.map(resort => (
                        <li key={resort.id}>
                            {resort.Resort} - {resort.Country}
                            <button onClick={() => handleRemove(resort.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => navigate('/resorts')}>Back to Resorts</button>
        </div>
    );
};

export default RemoveResort;



