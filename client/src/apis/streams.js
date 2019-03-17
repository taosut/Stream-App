import axios from 'axios';

export default axios.create({
  // Locate baseURL from json-server terminal under 'Home'.
  baseURL: 'http://localhost:3001'
});