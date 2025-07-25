// ✅ File: backend/models/adminModel.js
const db = require('../db');

const createAdmin = (email, password, callback) => {
  const sql = 'INSERT INTO admins (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], callback);
};

const findAdminByEmail = (email, callback) => {
  const sql = 'SELECT * FROM admins WHERE email = ?';
  db.query(sql, [email], callback);
};

module.exports = { createAdmin, findAdminByEmail };
