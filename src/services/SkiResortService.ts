import Papa from 'papaparse';
import { SkiResort } from '../types/SkiResort';

class SkiResortService {
    private skiResorts: SkiResort[] = [];

    async fetchSkiResorts(): Promise<SkiResort[]> {
        try {
            console.log('Fetching CSV data...');
            const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/European_Ski_Resorts-MMmjLiKOcLX0IX3CziLyR7BMls2gJ9.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvData = await response.text();
            console.log('CSV data fetched, first 500 characters:', csvData.substring(0, 500));

            return new Promise((resolve, reject) => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        this.skiResorts = results.data.map((row: any, index: number) => this.createSkiResort(row, index));
                        console.log('Parsed ski resorts (first 3):', JSON.stringify(this.skiResorts.slice(0, 3), null, 2));
                        resolve(this.skiResorts);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                        reject(error);
                    }
                });
            });
        } catch (error) {
            console.error('Error fetching ski resorts:', error);
            throw error;
        }
    }

    private createSkiResort(row: any, index: number): SkiResort {
        return {
            id: index,
            Resort: row.Resort || '',
            Country: row.Country || '',
            HighestPoint: row.HighestPoint || 0,
            LowestPoint: row.LowestPoint || 0,
            DayPassPriceAdult: row.DayPassPriceAdult || 0,
            BeginnerSlope: row.BeginnerSlope || 0,
            IntermediateSlope: row.IntermediateSlope || 0,
            DifficultSlope: row.DifficultSlope || 0,
            TotalSlope: row.TotalSlope || 0,
            SnowParks: row.SnowParks === 'Yes',
            NightSki: row.NightSki === 'Yes',
            SurfaceLifts: row.SurfaceLifts || 0,
            ChairLifts: row.ChairLifts || 0,
            GondolaLifts: row.GondolaLifts || 0,
            TotalLifts: row.TotalLifts || 0,
            LiftCapacity: row.LiftCapacity || 0,
            SnowCannons: row.SnowCannons || 0,
        };
    }

    getSkiResortById(id: number): SkiResort | undefined {
        return this.skiResorts.find(resort => resort.id === id);
    }

    addSkiResort(resort: Partial<SkiResort>): void {
        const newResort = this.createSkiResort(resort, this.skiResorts.length);
        this.skiResorts.push(newResort);
        console.log('Added new ski resort:', newResort);
    }

    removeSkiResort(id: number): void {
        const index = this.skiResorts.findIndex(resort => resort.id === id);
        if (index !== -1) {
            this.skiResorts.splice(index, 1);
            console.log(`Removed ski resort with id: ${id}`);
        } else {
            console.log(`Ski resort with id: ${id} not found`);
        }
    }
}

export const skiResortService = new SkiResortService();




























