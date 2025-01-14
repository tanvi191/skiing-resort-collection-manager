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
        <div className="add-resort">
            <h2>Add New Ski Resort</h2>
            <form onSubmit={handleSubmit}>
                <input name="Resort" value={resort.Resort} onChange={handleChange} placeholder="Resort Name" required />
                <input name="Country" value={resort.Country} onChange={handleChange} placeholder="Country" required />
                <input name="HighestPoint" type="number" value={resort.HighestPoint} onChange={handleChange} placeholder="Highest Point" required />
                <input name="LowestPoint" type="number" value={resort.LowestPoint} onChange={handleChange} placeholder="Lowest Point" required />
                <input name="DayPassPriceAdult" type="number" value={resort.DayPassPriceAdult} onChange={handleChange} placeholder="Day Pass Price" required />
                <input name="BeginnerSlope" type="number" value={resort.BeginnerSlope} onChange={handleChange} placeholder="Beginner Slope" required />
                <input name="IntermediateSlope" type="number" value={resort.IntermediateSlope} onChange={handleChange} placeholder="Intermediate Slope" required />
                <input name="DifficultSlope" type="number" value={resort.DifficultSlope} onChange={handleChange} placeholder="Difficult Slope" required />
                <input name="TotalSlope" type="number" value={resort.TotalSlope} onChange={handleChange} placeholder="Total Slope" required />
                <label>
                    <input
                        name="SnowParks"
                        type="checkbox"
                        checked={Boolean(resort.Snowparks)}
                        onChange={handleChange}
                    />
                    SnowParks
                </label>
                <label>
                    <input name="NightSki" type="checkbox" checked={resort.NightSki} onChange={handleChange} />
                    Night Ski
                </label>
                <input name="SurfaceLifts" type="number" value={resort.SurfaceLifts} onChange={handleChange} placeholder="Surface Lifts" required />
                <input name="ChairLifts" type="number" value={resort.ChairLifts} onChange={handleChange} placeholder="Chair Lifts" required />
                <input name="GondolaLifts" type="number" value={resort.GondolaLifts} onChange={handleChange} placeholder="Gondola Lifts" required />
                <input name="TotalLifts" type="number" value={resort.TotalLifts} onChange={handleChange} placeholder="Total Lifts" required />
                <input name="LiftCapacity" type="number" value={resort.LiftCapacity} onChange={handleChange} placeholder="Lift Capacity" required />
                <input name="SnowCannons" type="number" value={resort.SnowCannons} onChange={handleChange} placeholder="Snow Cannons" required />
                <button type="submit">Add Resort</button>
            </form>
        </div>
    );
};

export default AddResort;









