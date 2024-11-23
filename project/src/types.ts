export interface TripData {
  destination: string;
  days: number;
  budget: number;
  destinationInfo: {
    description: string;
    attractions: string[];
  };
  weatherInfo: {
    temperature: number;
    humidity: number;
    rainChance: number;
  };
}