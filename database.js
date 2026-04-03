const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./finance.db')

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    status TEXT
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    amount REAL,
    type TEXT,
    category TEXT,
    date TEXT,
    description TEXT,
    createdBy TEXT
  )`)
})

module.exports = db