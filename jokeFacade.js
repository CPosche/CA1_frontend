/*
  This file is just added to show you how you can use ES6 exports
  Observe, in index.js, how you can import
*/

//Setup some dummy test data
const jokes = [
  "A day without sunshine is like, night.",
  "At what age is it appropriate to tell my dog that he's adopted?",
  "I intend to live forever, or die trying",
  "I'm afraid for the calendar. Its days are numbered.",
  "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!",
  "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
];

function addJoke(joke) {
  jokes.push(joke);
}

function getJokeById(i) {
  return jokes[i];
}

function getJokes() {
  return jokes;
}

/* Make sure you understand what we create here, it involves VITAL JavaScript knowledge */
const jokeFacade = {
  addJoke,
  getJokeById,
  getJokes,
};

window.jokes = jokes; //Only for debugging

export default jokeFacade;
