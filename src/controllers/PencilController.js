import { ok, erorrHandler } from "../helpers/response";
import Topic from "../models/topic";
import Question from "../models/question";

class PencilController {
  /**
   * Get All Topics in the collection
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  topics(req, res) {
    Topic.find({}, { __v: 0 }, (err, topics) => {
      if (err) {
        return erorrHandler(res, "INTERNAL_SERVER_ERROR", err.message);
      }
      if (topics === null || topics.length === 0) {
        return erorrHandler(res, "NOT_FOUND", "No Topics Found");
      }
      return ok(res, "OK", { data: topics });
    });
  }

  /**
   * POST Topic(s) into Topic collection
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  topic(req, res) {
    const { body } = req;

    Topic.insertMany(body, (err, topics) => {
      if (err) {
        return erorrHandler(res, "INTERNAL_SERVER_ERROR", err.message);
      }
      return ok(res, "CREATED", { data: topics });
    });
  }

  /**
   * Get All Questions in the collection
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  questions(req, res) {
    Question.find({}, { __v: 0 }, (err, questions) => {
      if (err) {
        return erorrHandler(res, "INTERNAL_SERVER_ERROR", err.message);
      }
      if (questions === null || questions.length === 0) {
        return erorrHandler(res, "NOT_FOUND", "No Questions Found");
      }
      return ok(res, "OK", { data: questions });
    });
  }

  /**
   * POST Question(s) into Question collection
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  question(req, res) {
    const { body } = req;
    Question.insertMany(body, (err, questions) => {
      if (err) {
        return erorrHandler(res, "INTERNAL_SERVER_ERROR", err.message);
      }
      return ok(res, "CREATED", { data: questions });
    });
  }

  /**
   * Search Topics in the collection and return Questions assocaiteds to the Topics
   * @params {object} req HTTP request object
   * @params {object} res HTTP response object
   */
  async search(req, res) {
    const { q } = req.query;
    try {
      const topic = await Topic.findOne({ _id: q.toLowerCase() });
      if (topic === null) {
        return erorrHandler(res, "NOT_FOUND", "No Topic Found");
      }

      const stack = topic.children;
      const descendants = [];

      while (stack.length > 0) {
        const currentNode = stack.pop();
        const children = await Topic.findOne({ _id: currentNode });

        if (children === null || children.children.length === 0) {
          descendants.push(currentNode);
        } else {
          children.children.forEach((t) => stack.push(t));
        }
      }

      const questions = await Question.find({ annotations: { $in: descendants } }, { _id: 1 });
      if (questions === null || questions.length === 0) {
        return erorrHandler(res, "NOT_FOUND", "No Questions Found");
      }
      return ok(res, "OK", { data: questions.map((question) => `Question ${question._id}`) });
    } catch (e) {
      return erorrHandler(res, "INTERNAL_SERVER_ERROR", e.message);
    }
  }
}

export default new PencilController();
