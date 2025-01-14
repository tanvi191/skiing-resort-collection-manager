import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';

const SkiResortList: React.FC = () => {
    const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResorts = async () => {
            try {
                setIsLoading(true);
                const resorts = await skiResortService.fetchSkiResorts();
                console.log('Fetched resorts:', resorts);
                setSkiResorts(resorts);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching resorts:', err);
                setError('Failed to fetch ski resorts. Please try again later.');
                setIsLoading(false);
            }
        };
        fetchResorts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ski-resort-list">
            <h1>All Ski Resorts</h1>
            <div className="table-container">
                <table className="resort-table">
                    <thead>
                    <tr>
                        <th>Resort</th>
                        <th>Country</th>
                        <th>Highest Point (m)</th>
                        <th>Lowest Point (m)</th>
                        <th>Day Pass Price (€)</th>
                        <th>Total Slope (km)</th>
                        <th>Total Lifts</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {skiResorts.map((resort) => (
                        <tr key={resort.id}>
                            <td>{resort.Resort}</td>
                            <td>{resort.Country}</td>
                            <td>{resort.HighestPoint}</td>
                            <td>{resort.LowestPoint}</td>
                            <td>{resort.DayPassPriceAdult}</td>
                            <td>{resort.TotalSlope}</td>
                            <td>{resort.TotalLifts}</td>
                            <td>
                                <Link to={`/resort/${resort.id}`} className="view-details-btn">View Details</Link>
                                <Link to={`/dashboard/${resort.id}`} className="view-dashboard-btn">View Dashboard</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkiResortList;









