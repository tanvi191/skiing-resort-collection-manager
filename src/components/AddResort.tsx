import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skiResortService } from '../services/SkiResortService';
import { SkiResort } from '../types/SkiResort';

const AddResort: React.FC = () => {
    const [resort, setResort] = useState<Partial<SkiResort>>({
        Resort: '',
        Country: '',
        HighestPoint: 0,
        LowestPoint: 0,
        DayPassPriceAdult: 0,
        BeginnerSlope: 0,
        IntermediateSlope: 0,
        DifficultSlope: 0,
        TotalSlope: 0,
        SnowParks: false,
        NightSki: false,
        SurfaceLifts: 0,
        ChairLifts: 0,
        GondolaLifts: 0,
        TotalLifts: 0,
        LiftCapacity: 0,
        SnowCannons: 0
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setResort(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        skiResortService.addSkiResort(resort);
        navigate('/resorts');
    };

    return (
        <div className="add-resort-container">
            <h2>Add New Ski Resort</h2>
            <form onSubmit={handleSubmit} className="add-resort-form">
                <div className="form-group">
                    <label htmlFor="Resort">Resort Name:</label>
                    <input id="Resort" name="Resort" value={resort.Resort} onChange={handleChange} placeholder="Enter resort name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="Country">Country:</label>
                    <input id="Country" name="Country" value={resort.Country} onChange={handleChange} placeholder="Enter country" required />
                </div>
                <div className="form-group">
                    <label htmlFor="HighestPoint">Highest Point (m):</label>
                    <input id="HighestPoint" name="HighestPoint" type="number" value={resort.HighestPoint} onChange={handleChange} placeholder="Enter highest point" required />
                </div>
                <div className="form-group">
                    <label htmlFor="LowestPoint">Lowest Point (m):</label>
                    <input id="LowestPoint" name="LowestPoint" type="number" value={resort.LowestPoint} onChange={handleChange} placeholder="Enter lowest point" required />
                </div>
                <div className="form-group">
                    <label htmlFor="DayPassPriceAdult">Day Pass Price (€):</label>
                    <input id="DayPassPriceAdult" name="DayPassPriceAdult" type="number" value={resort.DayPassPriceAdult} onChange={handleChange} placeholder="Enter day pass price" required />
                </div>
                <div className="form-group">
                    <label htmlFor="BeginnerSlope">Beginner Slope (km):</label>
                    <input id="BeginnerSlope" name="BeginnerSlope" type="number" value={resort.BeginnerSlope} onChange={handleChange} placeholder="Enter beginner slope length" required />
                </div>
                <div className="form-group">
                    <label htmlFor="IntermediateSlope">Intermediate Slope (km):</label>
                    <input id="IntermediateSlope" name="IntermediateSlope" type="number" value={resort.IntermediateSlope} onChange={handleChange} placeholder="Enter intermediate slope length" required />
                </div>
                <div className="form-group">
                    <label htmlFor="DifficultSlope">Difficult Slope (km):</label>
                    <input id="DifficultSlope" name="DifficultSlope" type="number" value={resort.DifficultSlope} onChange={handleChange} placeholder="Enter difficult slope length" required />
                </div>
                <div className="form-group">
                    <label htmlFor="TotalSlope">Total Slope (km):</label>
                    <input id="TotalSlope" name="TotalSlope" type="number" value={resort.TotalSlope} onChange={handleChange} placeholder="Enter total slope length" required />
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="Snowparks">
                        <input id="SnowParks" name="Snowparks" type="checkbox" checked={resort.SnowParks} onChange={handleChange} />
                        SnowParks Available
                    </label>
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="NightSki">
                        <input id="NightSki" name="NightSki" type="checkbox" checked={resort.NightSki} onChange={handleChange} />
                        Night Skiing Available
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="SurfaceLifts">Surface Lifts:</label>
                    <input id="SurfaceLifts" name="SurfaceLifts" type="number" value={resort.SurfaceLifts} onChange={handleChange} placeholder="Enter number of surface lifts" required />
                </div>
                <div className="form-group">
                    <label htmlFor="ChairLifts">Chair Lifts:</label>
                    <input id="ChairLifts" name="ChairLifts" type="number" value={resort.ChairLifts} onChange={handleChange} placeholder="Enter number of chair lifts" required />
                </div>
                <div className="form-group">
                    <label htmlFor="GondolaLifts">Gondola Lifts:</label>
                    <input id="GondolaLifts" name="GondolaLifts" type="number" value={resort.GondolaLifts} onChange={handleChange} placeholder="Enter number of gondola lifts" required />
                </div>
                <div className="form-group">
                    <label htmlFor="TotalLifts">Total Lifts:</label>
                    <input id="TotalLifts" name="TotalLifts" type="number" value={resort.TotalLifts} onChange={handleChange} placeholder="Enter total number of lifts" required />
                </div>
                <div className="form-group">
                    <label htmlFor="LiftCapacity">Lift Capacity (persons/hour):</label>
                    <input id="LiftCapacity" name="LiftCapacity" type="number" value={resort.LiftCapacity} onChange={handleChange} placeholder="Enter lift capacity" required />
                </div>
                <div className="form-group">
                    <label htmlFor="SnowCannons">Snow Cannons:</label>
                    <input id="SnowCannons" name="SnowCannons" type="number" value={resort.SnowCannons} onChange={handleChange} placeholder="Enter number of snow cannons" required />
                </div>
                <button type="submit" className="submit-button">Add Resort</button>
            </form>
        </div>
    );
};

export default AddResort;











