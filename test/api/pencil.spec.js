import { expect } from 'chai';
import supertest from 'supertest';
import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';
import app from '../../src/server';
import db from '../../src/config/config';
import topics from '../mockData/topics';
import questions from '../mockData/questions';

const mockgoose = new Mockgoose(mongoose);
const request = supertest(app);

console.log({ log: process.env });

before(done => {
  mockgoose.prepareStorage()
    .then(() => {
      db
        .then((con) => {
          console.log({ con });
          done()})
        .catch((err) => done(err));
    })
})

after(done => {
  mongoose.connection.dropDatabase()
          .then(() => done())
          .catch((err) => done(err));
})

describe('GET /api/v1', () => {
  it('should return a 200 status and a welcome messasge', (done)=> {
    request
      .get('/api/v1')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(200)
        expect(body.message).to.equal("Hello, Welcome to Pencil Backend app")
        done();
      })
      .catch((err) => done(err));
  });
})

describe('GET /api/v1/topics', () => {
  it('should return a 404 status and No topics found response', (done)=> {
    request
      .get('/api/v1/topics')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(404)
        expect(body.success).to.equal(false)
        expect(body.message).to.equal("No Topics Found")
        done();
      })
      .catch((err) => done(err));
  });
})

describe('POST /api/v1/topic', () => {
  it('should return a 201 status and created topics', (done)=> {
    request
      .post('/api/v1/topic')
      .send(topics)
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(201)
        expect(body.success).to.equal(true)
        expect(body.data.length).to.equal(11)
        done();
      })
      .catch((err) => done(err));
  });
})

describe('GET /api/v1/topics', () => {
  it('should return a 200 status and all topics', (done)=> {
    request
      .get('/api/v1/topics')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(200)
        expect(body.success).to.equal(true)
        expect(body.data.length).to.equal(11)
        done();
      })
      .catch((err) => done(err));
  });
})

describe('GET /api/v1/questions', () => {
  it('should return a 404 status and no questons found response', (done)=> {
    request
      .get('/api/v1/questions')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(404)
        expect(body.success).to.equal(false)
        expect(body.message).to.equal("No Questions Found")
        done();
      })
      .catch((err) => done(err));
  });
})

describe('POST /api/v1/question', () => {
  it('should return a 201 status and created questions', (done)=> {
    request
      .post('/api/v1/question')
      .send(questions)
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(201)
        expect(body.success).to.equal(true)
        expect(body.data.length).to.equal(4)
        done();
      })
      .catch((err) => done(err));
  });
})

describe('GET /api/v1/questions', () => {
  it('should return a 200 status and all questions', (done)=> {
    request
      .get('/api/v1/questions')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(200)
        expect(body.success).to.equal(true)
        expect(body.data.length).to.equal(4)
        done();
      })
      .catch((err) => done(err));
  });
})
describe('GET /api/v1/search', () => {
  it('should return a 404 status and no topics found if no topic was found', (done)=> {
    request
      .get('/api/v1/search?q=')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(404)
        expect(body.success).to.equal(false)
        expect(body.message).to.equal("No Topic Found")
        done();
      })
      .catch((err) => done(err));
  });

  it('should return a 200 status and no questions found if no questions were found', (done)=> {
    request
      .get('/api/v1/search?q=Electron charge')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(404)
        expect(body.success).to.equal(false)
        expect(body.message).to.equal("No Questions Found")
        done();
      })
      .catch((err) => done(err));
  });

  it('should return a 200 status and found questions', (done)=> {
    request
      .get('/api/v1/search?q=Modern Physics')
      .then((res) => {
        const { body } = res
        
        expect(res.status).to.equal(200)
        expect(body.success).to.equal(true)
        expect(body.data.length).to.equal(3)
        done();
      })
      .catch((err) => done(err));
  });
})

