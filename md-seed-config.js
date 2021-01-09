import mongoose from 'mongoose';
import Topics from './src/seeders/topics.seeder';
import Questions from './src/seeders/questions.seeder';
import dotenv from 'dotenv';

dotenv.config();
let mongoURL;
if(process.env.NODE_ENV === 'production') {
  mongoURL=process.env.PRD_DB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
} else {
  mongoURL=`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
}

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Topics, 
  Questions
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
