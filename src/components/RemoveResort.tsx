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
        <div className="remove-resort-container">
            <h2 className="text-2xl font-bold mb-4">Remove Ski Resort</h2>
            {resorts.length === 0 ? (
                <p className="text-gray-600">No ski resorts available.</p>
            ) : (
                <ul className="space-y-2">
                    {resorts.map(resort => (
                        <li key={resort.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                            <span className="text-lg">{resort.Resort} - {resort.Country}</span>
                            <button
                                onClick={() => handleRemove(resort.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={() => navigate('/resorts')}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Back to Resorts
            </button>
        </div>
    );
};

export default RemoveResort;







