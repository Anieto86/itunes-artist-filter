export interface AppConfig {
  port: number;
  itunes: {
    baseUrl: string;
    timeout: number;
    maxRetries: number;
  };
  cache: {
    ttl: number;
    enabled: boolean;
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || "3000", 10),
  itunes: {
    baseUrl: process.env.ITUNES_BASE_URL || "https://itunes.apple.com",
    timeout: parseInt(process.env.ITUNES_TIMEOUT || "5000", 10),
    maxRetries: parseInt(process.env.ITUNES_MAX_RETRIES || "3", 10),
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || "300", 10), // 5 minutes
    enabled: process.env.CACHE_ENABLED !== "false",
  },
});
