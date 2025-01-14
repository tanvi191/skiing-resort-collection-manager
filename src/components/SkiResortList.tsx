import React, { useEffect, useState } from 'react';
import { SkiResort } from '../types/SkiResort';
import { skiResortService } from '../services/SkiResortService';
import { Link } from 'react-router-dom';

const SkiResortList: React.FC = () => {
    const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);

    useEffect(() => {
        const fetchResorts = async () => {
            const resorts = await skiResortService.fetchSkiResorts();
            setSkiResorts(resorts);
        };
        fetchResorts();
    }, []);