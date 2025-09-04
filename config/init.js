const initDB = require("./db");

async function createTables() {
  const db = await initDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      address TEXT,
      role TEXT DEFAULT 'user'
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      owner_id INTEGER,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      store_id INTEGER,
      rating INTEGER CHECK(rating BETWEEN 1 AND 5),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (store_id) REFERENCES stores(id)
    )
  `);

  console.log("✅ SQLite tables created successfully");
}

createTables();
