import mongoose from 'mongoose';
import dotenv  from 'dotenv';
import { exit } from 'process';

dotenv.config();
let dbURL;

if(process.env.NODE_ENV === 'developement') {
  dbURL=`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
} else if(process.env.NODE_ENV === 'production') {
  dbURL=process.env.PRD_DB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
}
 

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(con => {
  console.log('DB connected successfuly');
}).catch(err => {
  console.log(err.reason);
  exit();
})
