import { NhtsaApiResponse } from '../types';

export async function fetchVinData(vin: string): Promise<NhtsaApiResponse> {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('API error');
  return await response.json();
}