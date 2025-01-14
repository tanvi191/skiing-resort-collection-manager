import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';
import DashboardSelector from './DashboardSelector';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts"

const SkiResortDashboard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [resort, setResort] = useState<SkiResort | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResort = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (id) {
                    const resortData = await skiResortService.getSkiResortById(Number(id));
                    if (resortData) {
                        setResort(resortData);
                    } else {
                        setError('Resort not found');
                    }
                } else {
                    const resorts = await skiResortService.fetchSkiResorts();
                    if (resorts.length > 0) {
                        setResort(resorts[0]);
                    } else {
                        setError('No resorts available');
                    }
                }
            } catch (err) {
                setError('Failed to fetch resort data');
                console.error('Error fetching resort:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResort();
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

    const elevationData = [
        { name: 'Lowest Point', elevation: resort.LowestPoint },
        { name: 'Highest Point', elevation: resort.HighestPoint },
    ];

    return (
        <div className="ski-resort-dashboard">
            <DashboardSelector />
            <h1>{resort.Resort} Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Slope Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                beginner: {
                                    label: "Beginner",
                                    color: "hsl(var(--chart-1))",
                                },
                                intermediate: {
                                    label: "Intermediate",
                                    color: "hsl(var(--chart-2))",
                                },
                                difficult: {
                                    label: "Difficult",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <PieChart data={slopeData}>
                                <Pie
                                    dataKey="value"
                                    nameKey="name"
                                    fill="var(--color-beginner)"
                                    stroke="var(--color-beginner)"
                                    strokeWidth={2}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Lift Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                surface: {
                                    label: "Surface Lifts",
                                    color: "hsl(var(--chart-1))",
                                },
                                chair: {
                                    label: "Chair Lifts",
                                    color: "hsl(var(--chart-2))",
                                },
                                gondola: {
                                    label: "Gondola Lifts",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <BarChart data={liftData}>
                                <Bar dataKey="value" fill="var(--color-surface)" />
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Elevation Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                elevation: {
                                    label: "Elevation",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <LineChart data={elevationData}>
                                <Line type="monotone" dataKey="elevation" stroke="var(--color-elevation)" strokeWidth={2} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </LineChart>
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















