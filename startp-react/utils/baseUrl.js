const baseUrl = process.env.NODE_ENV === "production" 
? 'https://app.blockboosted.com' 
: 'http://localhost:3000';

export default baseUrl;