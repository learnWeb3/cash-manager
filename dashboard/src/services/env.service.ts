export interface Environment {
    NODE_ENV: "local" | "development" | "production";
    API_URL: string; 
}
  
const environment: Environment = {
    NODE_ENV: process.env.NODE_ENV as Environment["NODE_ENV"],
    API_URL: process.env.REACT_APP_API_URL as Environment["API_URL"]
};

export default environment;  