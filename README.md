# Pencile_backend
## Introduction
The goal of this project is to store and create an index over question objects in MongoDB, and write a NodeJS + Express based server that exposes a RESTful API to query the index and return questions that match the query. Each question will be annotated with one or more annotations. An annotation is defined as a topic that can come from a topic tree. An example topic tree is shown below.

## Usage
Copy this https://pbackend.herokuapp.com/api/v1/topics and access the application using Postman or clone this repository and run it on your machine.

## Installation and Setup
- Download and install the following if you don't have it installed aready.
   - [Node.js](https://nodejs.org/en/)
   - [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
   - [MongoDB](https://docs.mongodb.com/manual/installation/)
   - [Postman](https://www.postman.com/)
- Clone this application using the command `git clone git@github.com:chibuezeayogu/pencil_backend.git`
- Navigate to the application folder using `cd pencil_backend/`
- Install Application Dependencies using `yarn install`
- Seed database using ` NODE_ENV=development md-seed run`. In case you get an error while running the command, if you are using 
   - ZSH run this command `export PATH="./node_modules/.bin:$PATH" >> ~/.zshrc`
   - Bshrc run this command `export PATH="./node_modules/.bin:$PATH" >> ~/.bashrc`
- Create `.env` file and copy content of `.env.sample` to it and provide the appropriate values specified.
- Run the application using `yarn run dev-start`

## App Features
- GET All Topics `/api/v1/topics`
- POST Topic(s) `/api/v1/topic`
- GET All Questions `/api/v1/questions`
- POST Question(s) `/api/v1/question`
- Search for a Topic and return questions matching the topic. `/api/v1/search?q=enter_search_term_here`
- **NOTE** This can only be tested using Postman.

## Language
- JavaScript

## API Documentation
 - Coming soon 

## Technologies

`NodeJS:`is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

`es6(ECMAScript 2015)`: es6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, etc.

`Express`: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`MongoDB`: MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. It is used to persist Topics and Questions

`Babel`: Babel is used to transpile es6 down to es5.

`Mongoose`: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB

`Mocha`: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha is the testing framework used to test the API's functionalities.

## Author
- Chibueze Ayogu

## License
- This project is authored by Ayogu Chibueze Nelson, and is licensed for use, distribution and modification under the [MIT](https://github.com/chibuezeayogu/pencil_backend/blob/main/LICENSE) license
