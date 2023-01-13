const dotenv = require('dotenv'); 
dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.cgchunu.mongodb.net/?retryWrites=true&w=majority`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

exports.dt = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};