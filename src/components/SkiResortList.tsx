import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';

const SkiResortList: React.FC = () => {
    const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);
    const [filteredResorts, setFilteredResorts] = useState<SkiResort[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        country: '',
        minElevation: '',
        maxPrice: '',
    });

    useEffect(() => {
        const fetchResorts = async () => {
            try {
                setIsLoading(true);
                const resorts = await skiResortService.fetchSkiResorts();
                setSkiResorts(resorts);
                setFilteredResorts(resorts);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching resorts:', err);
                setError(`Failed to fetch ski resorts. Error: ${err instanceof Error ? err.message : String(err)}`);
                setIsLoading(false);
            }
        };
        fetchResorts();
    }, []);

    useEffect(() => {
        const filtered = skiResorts.filter((resort) => {
            const countryMatch = filters.country ? resort.Country.toLowerCase().includes(filters.country.toLowerCase()) : true;
            const elevationMatch = filters.minElevation ? resort.HighestPoint >= parseInt(filters.minElevation) : true;
            const priceMatch = filters.maxPrice ? resort.DayPassPriceAdult <= parseInt(filters.maxPrice) : true;
            return countryMatch && elevationMatch && priceMatch;
        });
        setFilteredResorts(filtered);
    }, [filters, skiResorts]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (filteredResorts.length === 0) {
        return <div className="no-resorts">No ski resorts found matching the current filters.</div>;
    }

    return (
        <div className="ski-resort-list">
            <h1>All Ski Resorts</h1>
            <div className="filters">
                <input
                    type="text"
                    name="country"
                    placeholder="Filter by country"
                    value={filters.country}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="minElevation"
                    placeholder="Min elevation (m)"
                    value={filters.minElevation}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max day pass price (€)"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />
            </div>
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
                    {filteredResorts.map((resort) => (
                        <tr key={resort.id}>
                            <td>{resort.Resort || 'N/A'}</td>
                            <td>{resort.Country || 'N/A'}</td>
                            <td>{resort.HighestPoint || 'N/A'}</td>
                            <td>{resort.LowestPoint || 'N/A'}</td>
                            <td>{resort.DayPassPriceAdult || 'N/A'}</td>
                            <td>{resort.TotalSlope || 'N/A'}</td>
                            <td>{resort.TotalLifts || 'N/A'}</td>
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

























