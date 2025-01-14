import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';

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





