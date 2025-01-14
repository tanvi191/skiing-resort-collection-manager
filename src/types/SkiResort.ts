export interface SkiResort {
    id: number;
    Resort: string;
    Country: string;
    HighestPoint: number;
    LowestPoint: number;
    DayPassPriceAdult: number;
    BeginnerSlope: number;
    IntermediateSlope: number;
    DifficultSlope: number;
    TotalSlope: number;
    SnowParks: boolean;
    NightSki: boolean;
    SurfaceLifts: number;
    ChairLifts: number;
    GondolaLifts: number;
    TotalLifts: number;
    LiftCapacity: number;
    SnowCannons: number;
    [key: string]: string | number | boolean; // Allow for additional properties
}

