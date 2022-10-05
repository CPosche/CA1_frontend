import "./style.css";
document.getElementById("all-content").style.display = "block";
import jokeFacade from "./jokeFacade";

const getJokeBtn = document.getElementById("getJoke");
const addJokeBtn = document.getElementById("addJoke");
const getQuoteBtn = document.getElementById("getQuote");
const fUserBtn = document.getElementById("fUserBtn");
const addBtn = document.getElementById("addBtn");
const selectUser = document.getElementById("editSelect");
const editBtn = document.getElementById("editBtn");

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("ex1_html").style = "display:none";
  document.getElementById("ex2_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function getJoke() {
  const idInput = document.getElementById("jokeInput");
  const jokeP = document.getElementById("jokeById");
  jokeP.innerText = jokeFacade.getJokeById(idInput.value - 1);
}

function addNewJoke() {
  const jokeToAdd = document.getElementById("jokeToAdd");
  jokeFacade.addJoke(jokeToAdd.value);
  jokeToAdd.value = "";
  const jokeList = document.getElementById("jokes");
  const jokes = jokeFacade.getJokes();
  jokeList.innerHTML = jokes.map((e) => `<li>${e}</li>`);
}

function getAllJokes() {
  const jokes = jokeFacade.getJokes();
  const jokeList = document.getElementById("jokes");
  jokeList.innerHTML = jokes.map((e) => `<li>${e}</li>`);
}

const getAllUsers = () => {
  const url = "http://localhost:3333/api/users";
  const table = document.getElementById("allUserRows");
  fetch(url)
    .then((response) => response.json())
    .then(
      (data) =>
        (table.innerHTML = data
          .map(
            (el) => `<tr>
    <td>${el.id}</td>
    <td>${el.age}</td>
    <td>${el.name}</td>
    <td></td>
    <td>${el.gender}</td>
    <td>${el.email}</td>
    </tr>`
          )
          .join(""))
    );
};

function getRadioValue(theRadioGroup) {
  var elements = document.getElementsByName(theRadioGroup);
  for (var i = 0, l = elements.length; i < l; i++) {
    if (elements[i].checked) {
      return elements[i].value;
    }
  }
}

const getAllUsersEdit = () => {
  const url = "http://localhost:3333/api/users";
  fetch(url)
    .then((response) => response.json())
    .then(
      (data) =>
        (selectUser.innerHTML += data
          .map(
            (el) =>
              `<option value="${el.id}">
              ${el.name} - ${el.email}
            </option>`
          )
          .join(""))
    );
};

const addUser = () => {
  const url = "http://localhost:3333/api/users";
  const age = document.getElementById("addage");
  const name = document.getElementById("addname");
  const gender = getRadioValue("addgenderCheck");
  const email = document.getElementById("addemail");
  const toAdd = {
    age: age.value,
    name: `${name.value}`,
    gender: `${gender}`,
    email: `${email.value}`,
  };
  console.log(JSON.stringify(toAdd));
  const options = makeOptions("POST", toAdd);
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
  getAllUsers();
  getAllUsersEdit();
};

const getUserById = () => {
  const fUserInput = document.getElementById("fUserInput");
  const url = "http://localhost:3333/api/users/" + fUserInput.value;
  const fUserOutput = document.getElementById("fUserOutput");
  fetch(url)
    .then((response) => response.json())
    .then(
      (data) =>
        (fUserOutput.innerText = `${Object.keys(data).join(
          ", "
        )}\n ${Object.values(data).join(", ")}`)
    );
};

const getUserByIdForEdit = () => {
  const age = document.getElementById("editage");
  const name = document.getElementById("editname");
  const gender = document.getElementsByName("editgenderCheck");
  const email = document.getElementById("editemail");
  const url = "http://localhost:3333/api/users/" + selectUser.value;
  fetch(url)
    .then((response) => response.json())
    .then(
      (data) => (
        (age.value = data.age),
        (name.value = data.name),
        gender.forEach((el) =>
          el.value === data.gender ? (el.checked = true) : (el.checked = false)
        ),
        (email.value = data.email)
      )
    );
  age.disabled = false;
  name.disabled = false;
  gender.forEach((el) => (el.disabled = false));
  email.disabled = false;
  editBtn.disabled = false;
};

const editUser = () => {
  const age = document.getElementById("editage");
  const name = document.getElementById("editname");
  const genderRadio = document.getElementsByName("editgenderCheck");
  const gender = getRadioValue("editgenderCheck");
  const email = document.getElementById("editemail");
  const url = "http://localhost:3333/api/users/" + selectUser.value;
  const toAdd = {
    age: age.value,
    name: `${name.value}`,
    gender: `${gender}`,
    email: `${email.value}`,
  };
  const options = makeOptions("PUT", toAdd);
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
  getAllUsers();
  getAllUsersEdit();
  age.disabled = true;
  name.disabled = true;
  genderRadio.forEach((el) => (el.disabled = true));
  genderRadio.forEach((el) => (el.checked = false));
  email.disabled = true;
  editBtn.disabled = true;
  age.value = "";
  name.value = "";
  email.value = "";
};

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function getRandomQuote() {
  const url = "https://api.chucknorris.io/jokes/random";
  const quoteP = document.getElementById("quotePlaceholder");
  const quoteInterval = setInterval(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => (quoteP.innerText = data.value));
  }, 5000);
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1":
      hideAllShowOne("ex1_html");
      getAllJokes();
      getJokeBtn.addEventListener("click", getJoke);
      addJokeBtn.addEventListener("click", addNewJoke);
      break;
    case "ex2":
      hideAllShowOne("ex2_html");
      // getQuoteBtn.addEventListener("click", getRandomQuote);
      getRandomQuote();
      break;
    case "ex3":
      hideAllShowOne("ex3_html");
      getAllUsers();
      fUserBtn.addEventListener("click", getUserById);
      addBtn.addEventListener("click", addUser);
      getAllUsersEdit();
      selectUser.addEventListener("change", getUserByIdForEdit);
      editBtn.addEventListener("click", editUser);
      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
