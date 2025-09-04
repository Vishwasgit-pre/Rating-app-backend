const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Function to open database connection
async function initDB() {
  return open({
    filename: "./rating_app.db",  // database file will be created in project root
    driver: sqlite3.Database
  });
}

module.exports = initDB;
