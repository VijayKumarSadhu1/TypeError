const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");

let dataBase = null;
const dataBasePath = path.join(__dirname, "moviesData.db");

const initializeDbAndServer = async () => {
  db = await open({
    filename: dataBasePath,
    driver: sqlite3.Database,
  });
  app.listen(3000, () => {
    try {
      console.log("Server Running...");
    } catch (e) {
      console.log(`DB Error ${e.message}`);
      process.exit(1);
    }
  });
};
initializeDbAndServer();

app.get("/movies/", async (request, response) => {
  const queryForMoviesNames = `SELECT movie_name FROM movie;`;
  const executeQueryOnDb = await dataBase.get(queryForMoviesNames);
  response.send(executeQueryOnDb);
});
