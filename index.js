const express = require("express");

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
// Request body = { "name" : "Diego"}

//CRUD - Create, Read, Update, Delete

const users = ["Ramon", "Claudio", "Gilberto"];

//Middleware Global
// server.use((req, res, next) => {
//   console.log("Request");
//   console.log(`Método: ${req.method}; URL: ${req.url};`);
//   next();
//   console.timeEnd("Request");
// });

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User not found on database!" });
  }

  req.user = user;

  return next();
}

function checkUserExists(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: "User not found on request body" });
  }
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { nome } = req.body;
  users.push(nome);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;
  users[index] = nome;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen("3000");
