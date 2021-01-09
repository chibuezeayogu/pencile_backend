import { ok, erorrHandler  } from '../helpers/response';
import Topic from '../models/topic';
import Question from '../models/question';

class PencilController {

  /**
   * Get All Topics in the collection
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  topics(req, res) {
    Topic.find({}, (err, topics) => {
      if(err) {
        return res.statusCode(400).send({ message: err });
      } else {
        if(topics === null) {
          return erorrHandler(res, 'NOT_FOUND', "No Topics Found");
        }
        return ok(res, { data: topics });
      }
    })
  }

  /**
   * Get All Questions in the collection
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  questions(req, res) {
    Question.find({}, (err, questions) => {
      if(err) {
        return erorrHandler(res, 'INTERNAL_SERVER_ERROR', err.message);
      } else {
        if(questions === null || questions.length === 0) {
          return erorrHandler(res, 'NOT_FOUND', "No Questions Found");
        }
        return ok(res, { data: questions });
      }
    })
  }

  /**
   * Search Topics in the collection and return Questions assocaiteds to the Topics
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  async search(req, res, next) {
    const { q } = req.query;
    try {
      const topic = await Topic.findOne({ _id: q.toLowerCase() });
      if(topic === null) {
        return erorrHandler(res, 'NOT_FOUND', "No Topics Found");
      }

      let stack = topic.children;
      let descendants = [];

      while(stack.length > 0) {
        let currentNode = stack.pop();
        let children = await Topic.findOne({ _id: currentNode });

        if(children === null || children.children.length === 0){
          descendants.push(currentNode);
        } else {
          children.children.forEach(t => stack.push(t));
        }
      }

      const questions = await Question.find({ annotations: { $in: descendants }}, { _id: 1});
      if(questions === null || questions.length === 0) {
        return erorrHandler(res, 'NOT_FOUND', "No Questions Found");
      }
      return ok(res, { data: questions.map(q => `Question ${q._id}`) });
    } catch (e) {
      return erorrHandler(res, 'INTERNAL_SERVER_ERROR', e.message);
    }
  }
}

export default new PencilController();
