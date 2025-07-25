// ✅ File: backend/utils/anonymizer.js
function anonymize(text) {
  return text
    .replace(/\b(Mr\\.|Ms\\.|Mrs\\.|Miss|he|she|him|her|his|hers)\\b/gi, '[REDACTED]')
    .replace(/\b[A-Z][a-z]+\\s[A-Z][a-z]+\\b/g, '[REDACTED NAME]')
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}/gi, '[REDACTED EMAIL]');
}

module.exports = anonymize;
