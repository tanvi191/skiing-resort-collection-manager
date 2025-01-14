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