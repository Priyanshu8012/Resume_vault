// ✅ File: frontend/src/pages/ResumeForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    text: '',
    skills: '',
    experience_years: ''
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/resumes', formData);
      setSuccess('Resume submitted successfully!');
      setFormData({ text: '', skills: '', experience_years: '' });
    } catch (err) {
      console.error('Error submitting resume:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12 bg-gradient-to-br from-white to-indigo-50 shadow-xl rounded-lg border-t-8 border-indigo-600">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">📄 Submit Your Resume</h2>
      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded border border-green-200 mb-4">
          <FaCheckCircle /> <span>{success}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Paste resume text here..."
          rows={6}
          className="w-full p-4 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="number"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
          placeholder="Years of Experience"
          className="w-full p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow"
        >
          Submit Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;