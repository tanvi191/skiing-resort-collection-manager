import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';

const SkiResortDashboard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [resort, setResort] = useState<SkiResort | null>(null);

    useEffect(() => {
        if (id) {
            const resortData = skiResortService.getSkiResortById(Number(id));
            setResort(resortData || null);
        }
    }, [id]);

    if (!resort) {
        return <div>Loading...</div>;
    }

    const maxAltitude = 4000; // Assuming 4000m as the max altitude for visualization
    const altitudePercentage = (resort.HighestPoint / maxAltitude) * 100;

    return (
        <div className="ski-resort-dashboard">
            <h1>{resort.Resort} Dashboard</h1>
            <div className="dashboard-grid">
                <div className="dashboard-item">
                    <h2>Lift Types</h2>
                    <div className="lift-animation">
                        <div className="lift surface" style={{ height: `${(resort.SurfaceLifts / resort.TotalLifts) * 100}%` }}>
                            <span>{resort.SurfaceLifts}</span>
                        </div>
                        <div className="lift chair" style={{ height: `${(resort.ChairLifts / resort.TotalLifts) * 100}%` }}>
                            <span>{resort.ChairLifts}</span>
                        </div>
                        <div className="lift gondola" style={{ height: `${(resort.GondolaLifts / resort.TotalLifts) * 100}%` }}>
                            <span>{resort.GondolaLifts}</span>
                        </div>
                    </div>
                </div>
                <div className="dashboard-item">
                    <h2>Altitude</h2>
                    <div className="mountain-animation" style={{ height: `${altitudePercentage}%` }}>
                        <div className="mountain-peak"></div>
                        <span>{resort.HighestPoint}m</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkiResortDashboard;

