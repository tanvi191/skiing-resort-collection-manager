import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skiResortService } from '../services/SkiResortService';

const AddResort: React.FC = () => {
    const [resort, setResort] = useState({
        Resort: '',
        Country: '',
        HighestPoint: 0,
        LowestPoint: 0,
        TotalSlope: 0
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResort(prev => ({ ...prev, [name]: value }));
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
                <input name="TotalSlope" type="number" value={resort.TotalSlope} onChange={handleChange} placeholder="Total Slope" required />
                <button type="submit">Add Resort</button>
            </form>
        </div>
    );
};

export default AddResort;