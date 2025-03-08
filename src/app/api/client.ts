export interface APIConfig {
  baseUrl: string;
}

export class APIClient {
  private static instance: APIClient;
  
  constructor(private config: APIConfig) {}
  
  static getInstance(config: APIConfig): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient(config);
    }
    return APIClient.instance;
  }
}

// Use dependency injection
export const createAPIClient = (config: APIConfig) => APIClient.getInstance(config);
//todo implement APIConfig
