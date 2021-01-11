import mongoose from 'mongoose';
import Topics from './src/seeders/topics.seeder';
import Questions from './src/seeders/questions.seeder';
import db from './src/config/config'


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
  await db
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
