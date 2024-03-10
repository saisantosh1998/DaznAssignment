import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });
const config = {
    mongoDBUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    redishost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
    redisPassword: process.env.REDIS_PASSWORD,
};

export default config;