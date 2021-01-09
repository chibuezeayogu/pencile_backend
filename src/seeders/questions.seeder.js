import { Seeder } from 'mongoose-data-seed';
import Question from '../models/question';
import fs from 'fs';
import neatCsv from 'neat-csv';

const questions = []
fs.readFile('./src/seed-data/questions.csv', async(err, data) => {
  if(err) {
    return console.log({ err });
  }
  const questionArray = await neatCsv(data);
  questionArray.forEach(row => {
  let question = {};
  let annotation = [];
    for (const key in row) {
      if(key.includes("Question")){
        question['_id'] = Number(row[key])
      } else {
        annotation.push(row[key])
      }
    }
    questions.push({ ...question, annotations: annotation });
  });
});

class QuestionsSeeder extends Seeder {

  async shouldRun() {
    return Question.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Question.create(questions);
  }
}

export default QuestionsSeeder;
