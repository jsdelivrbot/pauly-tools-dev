const express = require('express');
const path = require('path');
const config = require('config');

const PORT = process.env.PORT || config.DEFAULT.PORT;

/**
 * base page redirect
 */
function handleBaseRedirect(req, resp) {
  const redirectURL = (process.env.BASE_REDIRECT || config.BASE_REDIRECT);
  resp.redirect(redirectURL);
}

//-- investigate further
//-- react / node / express / webpack
//-- https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708
//-- https://github.com/crsandeep/simple-react-full-stack
//-- react app from scratch - webpack 4
//-- https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
//-- webpack
//-- https://github.com/crsandeep/simple-react-full-stack (one for each page)

//-- http://ccoenraets.github.io/es6-tutorial-data/babel-webpack/
//-- http://ccoenraets.github.io/es6-tutorial/

express()
  .use(express.static(path.resolve(__dirname, 'public')))
  .set('views', path.join(__dirname, './'))
  .set('view engine', 'ejs')
  .get('/', handleBaseRedirect)
  .get('/heroku', (req, res) => res.render('pages/heroku'))
  .get('/javascript', (req, res) => res.render('pages/exampleJavascript'))
  .get('/react', (req, res) => res.render('pages/exampleReact'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));