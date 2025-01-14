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
        return lines.slice(1).map((line, index) => {
            const values = line.split(',').map(value => value.trim());
            const resort: Partial<SkiResort> = { id: index };
            headers.forEach((header, i) => {
                const value = this.parseValue(values[i]);
                if (value !== undefined) {
                    (resort as any)[header] = value;
                }
            });
            return resort as SkiResort;
        });
    }

    private parseValue(value: string): string | number | boolean | undefined {
        if (value === '') return undefined;
        if (value === 'Yes') return true;
        if (value === 'No') return false;
        const num = Number(value);
        return isNaN(num) ? value : num;
    }

    getSkiResortById(id: number): SkiResort | undefined {
        return this.skiResorts.find(resort => resort.id === id);
    }

    addSkiResort(resort: Partial<SkiResort>): void {
        const newResort: SkiResort = {
            ...resort,
            id: this.skiResorts.length,
            // Set default values for properties not provided
            SnowParks: resort.SnowParks || false,
            NightSki: resort.NightSki || false,
            SurfaceLifts: resort.SurfaceLifts || 0,
            ChairLifts: resort.ChairLifts || 0,
            GondolaLifts: resort.GondolaLifts || 0,
            TotalLifts: resort.TotalLifts || 0,
            LiftCapacity: resort.LiftCapacity || 0,
            SnowCannons: resort.SnowCannons || 0,
        } as SkiResort;
        this.skiResorts.push(newResort);
        console.log('Added new ski resort:', newResort);
    }

    removeSkiResort(id: number): void {
        this.skiResorts = this.skiResorts.filter(resort => resort.id !== id);
        console.log(`Removed ski resort with id: ${id}`);
    }
}

export const skiResortService = new SkiResortService();








