export interface NhtsaApiResponse {
  Results: Array<{
    Variable: string;
    Value: string | null;
  }>;
}

export type RootStackParamList = {
  VinInput: undefined;
  VinResult: { vin: string; data: NhtsaApiResponse };
};