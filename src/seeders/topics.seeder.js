import { Seeder } from 'mongoose-data-seed';
import Topic from '../models/topic';
import topics from '../seed-data/topics'


class TopicsSeeder extends Seeder {

  async shouldRun() {
    return Topic.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Topic.create(topics);
  }
}

export default TopicsSeeder;
