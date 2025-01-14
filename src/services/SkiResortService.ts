import { SkiResort } from '../types/SkiResort';

class SkiResortService {
    private skiResorts: SkiResort[] = [];

    async fetchSkiResorts(): Promise<SkiResort[]> {
        try {
            const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/European_Ski_Resorts-MMmjLiKOcLX0IX3CziLyR7BMls2gJ9.csv');
            const csvData = await response.text();
            this.skiResorts = this.parseCSV(csvData);
            return this.skiResorts;
        } catch (error) {
            console.error('Error fetching ski resorts:', error);
            return [];
        }
    }

    private parseCSV(csvData: string): SkiResort[] {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map((line, index) => {
            const values = line.split(',');
            const resort: any = { id: index };
            headers.forEach((header, i) => {
                resort[header] = this.parseValue(values[i]);
            });
            return resort as SkiResort;
        });
    }

    private parseValue(value: string): any {
        if (value === 'Yes') return true;
        if (value === 'No') return false;
        const num = Number(value);
        return isNaN(num) ? value : num;
    }