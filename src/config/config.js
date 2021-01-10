import mongoose from 'mongoose';
import dotenv  from 'dotenv';

dotenv.config();
let dbURL;

if(process.env.NODE_ENV === 'production') {
  dbURL=process.env.PRD_DB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
} else if(process.env.NODE_ENV === 'test') {
  dbURL=`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/test`;
} else  {
  dbURL=`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
}
 

const db = mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

export default db;
