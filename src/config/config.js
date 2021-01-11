import mongoose from 'mongoose';
import dotenv  from 'dotenv';

dotenv.config();
let dbURL;

if(process.env.NODE_ENV === 'production') {
  dbURL=process.env.PRD_DB_URL
} else if(process.env.NODE_ENV === 'test') {
  dbURL='mongodb+srv://new_user:Computer123.@cluster0.8zop0.mongodb.net/test?retryWrites=true&w=majority'
} else  {
  dbURL=process.env.DEV_DB_URL
}
 

const db = mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

export default db;
