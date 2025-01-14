import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';
import DashboardSelector from './DashboardSelector';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const SkiResortDashboard: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [resort, setResort] = useState<SkiResort | null>(null);
    const [resortsInCountry, setResortsInCountry] = useState<SkiResort[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResortData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let resortData: SkiResort | null | undefined = null; // Update 1
                const allResorts = await skiResortService.fetchSkiResorts();

                if (id) {
                    resortData = await skiResortService.getSkiResortById(Number(id)) || null; // Update 3
                } else if (allResorts.length > 0) {
                    resortData = allResorts[0];
                }

                if (resortData) {
                    setResort(resortData);
                    const countryResorts = allResorts.filter(r => r.Country === resortData.Country);
                    setResortsInCountry(countryResorts);
                } else {
                    setError('No resort data available'); // Update 2
                }
            } catch (err) {
                setError('Failed to fetch resort data');
                console.error('Error fetching resort:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResortData().catch(err => {
            console.error("Error in fetchResortData:", err);
            setError('An unexpected error occurred');
        });
    }, [id]);

    if (isLoading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!resort) {
        return <div className="error">No resort data available</div>;
    }

    const slopeData = [
        { name: 'Beginner', value: resort.BeginnerSlope },
        { name: 'Intermediate', value: resort.IntermediateSlope },
        { name: 'Difficult', value: resort.DifficultSlope },
    ];

    const liftData = [
        { name: 'Surface Lifts', value: resort.SurfaceLifts },
        { name: 'Chair Lifts', value: resort.ChairLifts },
        { name: 'Gondola Lifts', value: resort.GondolaLifts },
    ];

    const elevationData = resortsInCountry.map(r => ({
        name: r.Resort,
        elevation: r.HighestPoint,
    }));

    return (
        <div className="ski-resort-dashboard">
            <DashboardSelector />
            <h1>{resort.Resort} Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Slope Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer className="h-[300px] w-full" config={{
                            beginner: { label: "Beginner", color: "hsl(var(--chart-1))" },
                            intermediate: { label: "Intermediate", color: "hsl(var(--chart-2))" },
                            difficult: { label: "Difficult", color: "hsl(var(--chart-3))" },
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={slopeData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="var(--color-beginner)"
                                        label
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Lift Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer className="h-[300px] w-full" config={{
                            surface: { label: "Surface Lifts", color: "hsl(var(--chart-1))" },
                            chair: { label: "Chair Lifts", color: "hsl(var(--chart-2))" },
                            gondola: { label: "Gondola Lifts", color: "hsl(var(--chart-3))" },
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={liftData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" fill="var(--color-surface)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Elevation Comparison ({resort.Country})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer className="h-[300px] w-full" config={{
                            elevation: { label: "Elevation", color: "hsl(var(--chart-1))" },
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={elevationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="elevation" stroke="var(--color-elevation)" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Resort Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Country:</strong> {resort.Country}</p>
                        <p><strong>Highest Point:</strong> {resort.HighestPoint} m</p>
                        <p><strong>Lowest Point:</strong> {resort.LowestPoint} m</p>
                        <p><strong>Total Slope:</strong> {resort.TotalSlope} km</p>
                        <p><strong>Day Pass Price:</strong> €{resort.DayPassPriceAdult}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Additional Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Snowparks:</strong> {resort.Snowparks ? 'Yes' : 'No'}</p>
                        <p><strong>Night Skiing:</strong> {resort.NightSki ? 'Yes' : 'No'}</p>
                        <p><strong>Total Lifts:</strong> {resort.TotalLifts}</p>
                        <p><strong>Lift Capacity:</strong> {resort.LiftCapacity} persons/hour</p>
                        <p><strong>Snow Cannons:</strong> {resort.SnowCannons}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="navigation-links mt-4">
                <Link to="/resorts" className="back-link">Back to All Resorts</Link>
                <Link to={`/resort/${resort.id}`} className="details-link">View Full Details</Link>
            </div>
        </div>
    );
};

export default SkiResortDashboard;



























