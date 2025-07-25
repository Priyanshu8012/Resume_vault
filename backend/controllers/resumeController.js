// ✅ File: backend/controllers/resumeController.js
const db = require('../db');
const anonymize = require('../utils/anonymizer');

exports.submitResume = (req, res) => {
  const { text, skills, experience_years } = req.body;
  const anonymizedText = anonymize(text);

  const sql = 'INSERT INTO resumes (anonymized_text, skills, experience_years) VALUES (?, ?, ?)';
  db.query(sql, [anonymizedText, skills, experience_years], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Resume submitted successfully' });
  });
};

exports.getResumes = (req, res) => {
  const { skill, experience } = req.query;
  let sql = 'SELECT * FROM resumes WHERE 1=1';
  const params = [];

  if (skill) {
    sql += ' AND skills LIKE ?';
    params.push(`%${skill}%`);
  }

  if (experience) {
    sql += ' AND experience_years >= ?';
    params.push(experience);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch resumes' });
    res.json(results);
  });
};
