import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';

const SkiResortDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [resort, setResort] = useState<SkiResort | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResort = async () => {
            if (id) {
                setIsLoading(true);
                setError(null);
                try {
                    const resortData = await skiResortService.getSkiResortById(Number(id));
                    if (resortData) {
                        setResort(resortData);
                    } else {
                        setError('Resort not found');
                    }
                } catch (err) {
                    setError('Failed to fetch resort data');
                    console.error('Error fetching resort:', err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchResort();
    }, [id]);

    if (isLoading) {
        return <div className="loading">Loading resort details...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!resort) {
        return <div className="error">No resort data available</div>;
    }

    return (
        <div className="ski-resort-detail">
            <h1>{resort.Resort}</h1>
            <div className="resort-info">
                <p><strong>Country:</strong> {resort.Country}</p>
                <p><strong>Highest Point:</strong> {resort.HighestPoint} m</p>
                <p><strong>Lowest Point:</strong> {resort.LowestPoint} m</p>
                <p><strong>Day Pass Price (Adult):</strong> €{resort.DayPassPriceAdult}</p>
                <p><strong>Total Slope:</strong> {resort.TotalSlope} km</p>
                <p><strong>Beginner Slope:</strong> {resort.BeginnerSlope} km</p>
                <p><strong>Intermediate Slope:</strong> {resort.IntermediateSlope} km</p>
                <p><strong>Difficult Slope:</strong> {resort.DifficultSlope} km</p>
                <p><strong>SnowParks:</strong> {resort.SnowParks ? 'Yes' : 'No'}</p>
                <p><strong>Night Ski:</strong> {resort.NightSki ? 'Yes' : 'No'}</p>
                <p><strong>Total Lifts:</strong> {resort.TotalLifts}</p>
                <p><strong>Surface Lifts:</strong> {resort.SurfaceLifts}</p>
                <p><strong>Chair Lifts:</strong> {resort.ChairLifts}</p>
                <p><strong>Gondola Lifts:</strong> {resort.GondolaLifts}</p>
                <p><strong>Lift Capacity:</strong> {resort.LiftCapacity} persons/hour</p>
                <p><strong>Snow Cannons:</strong> {resort.SnowCannons}</p>
            </div>
            <div className="navigation-links">
                <Link to="/resorts" className="back-link">Back to All Resorts</Link>
                <Link to={`/dashboard/${resort.id}`} className="dashboard-link">View Dashboard</Link>
            </div>
        </div>
    );
};

export default SkiResortDetail;







