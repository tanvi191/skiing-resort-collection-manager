import { SkiResort } from '../types/SkiResort';

class SkiResortService {
    private skiResorts: SkiResort[] = [];

    async fetchSkiResorts(): Promise<SkiResort[]> {
        try {
            console.log('Fetching CSV data...');
            const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/European_Ski_Resorts-MMmjLiKOcLX0IX3CziLyR7BMls2gJ9.csv');
            const csvData = await response.text();
            console.log('CSV data fetched, first 100 characters:', csvData.substring(0, 100));
            this.skiResorts = this.parseCSV(csvData);
            console.log('Parsed ski resorts:', this.skiResorts);
            return this.skiResorts;
        } catch (error) {
            console.error('Error fetching ski resorts:', error);
            return [];
        }
    }

    private parseCSV(csvData: string): SkiResort[] {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        console.log('CSV Headers:', headers);

        return lines.slice(1).map((line, index) => {
            const values = line.split(',').map(value => value.trim());
            console.log(`Parsing line ${index + 1}:`, values);
            const resort = this.createSkiResort(headers, values, index);
            console.log(`Parsed resort ${index + 1}:`, resort);
            return resort;
        });
    }

    private createSkiResort(headers: string[], values: string[], index: number): SkiResort {
        const resort: Partial<SkiResort> = { id: index };

        headers.forEach((header, i) => {
            const value = this.parseValue(values[i]);
            if (value !== undefined) {
                switch (header) {
                    case 'Resort':
                    case 'Country':
                        resort[header] = value as string;
                        break;
                    case 'HighestPoint':
                    case 'LowestPoint':
                    case 'DayPassPriceAdult':
                    case 'BeginnerSlope':
                    case 'IntermediateSlope':
                    case 'DifficultSlope':
                    case 'TotalSlope':
                    case 'SurfaceLifts':
                    case 'ChairLifts':
                    case 'GondolaLifts':
                    case 'TotalLifts':
                    case 'LiftCapacity':
                    case 'SnowCannons':
                        resort[header] = typeof value === 'number' ? value : 0;
                        break;
                    case 'Snowparks':
                    case 'NightSki':
                        resort[header] = value === true;
                        break;
                }
            }
        });

        return this.validateSkiResort(resort);
    }

    private parseValue(value: string): string | number | boolean | undefined {
        if (value === '') return undefined;
        if (value === 'Yes') return true;
        if (value === 'No') return false;
        const num = Number(value.replace(',', '.'));  // Replace comma with dot for proper number parsing
        return isNaN(num) ? value : num;
    }

    private validateSkiResort(resort: Partial<SkiResort>): SkiResort {
        return {
            id: resort.id ?? 0,
            Resort: resort.Resort ?? '',
            Country: resort.Country ?? '',
            HighestPoint: resort.HighestPoint ?? 0,
            LowestPoint: resort.LowestPoint ?? 0,
            DayPassPriceAdult: resort.DayPassPriceAdult ?? 0,
            BeginnerSlope: resort.BeginnerSlope ?? 0,
            IntermediateSlope: resort.IntermediateSlope ?? 0,
            DifficultSlope: resort.DifficultSlope ?? 0,
            TotalSlope: resort.TotalSlope ?? 0,
            SnowParks: resort.SnowParks ?? false,
            NightSki: resort.NightSki ?? false,
            SurfaceLifts: resort.SurfaceLifts ?? 0,
            ChairLifts: resort.ChairLifts ?? 0,
            GondolaLifts: resort.GondolaLifts ?? 0,
            TotalLifts: resort.TotalLifts ?? 0,
            LiftCapacity: resort.LiftCapacity ?? 0,
            SnowCannons: resort.SnowCannons ?? 0,
        };
    }

    getSkiResortById(id: number): SkiResort | undefined {
        return this.skiResorts.find(resort => resort.id === id);
    }

    addSkiResort(resort: Partial<SkiResort>): void {
        const newResort = this.validateSkiResort({ ...resort, id: this.skiResorts.length });
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


















