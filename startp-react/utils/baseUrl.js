const baseUrl = process.env.NODE_ENV === "production" 
? 'https://blockboosted.com' 
: 'http://localhost:3000';

export default baseUrl;