export interface Environment {
    name: "local" | "dev" | "staging" | "production";
    apiURL: string; 
}
  
const environment: Environment = {
    name: process.env.REACT_APP_ENVIRONMENT as Environment["name"],
    apiURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
};

export default environment;  