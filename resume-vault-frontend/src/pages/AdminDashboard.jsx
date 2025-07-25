// ✅ File: frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [filters, setFilters] = useState({ skill: '', experience: '' });
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchResumes = async () => {
    try {
      const query = new URLSearchParams();
      if (filters.skill) query.append('skill', filters.skill);
      if (filters.experience) query.append('experience', filters.experience);

      const res = await axios.get(`http://localhost:5000/api/resumes?${query.toString()}`);
      setResumes(res.data);
    } catch (err) {
      console.error('Error fetching resumes:', err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-600">🛠 Admin Resume Vault</h2>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            name="skill"
            placeholder="Search by skill..."
            className="w-full p-3 pl-10 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleFilterChange}
          />
          <FaSearch className="absolute top-3.5 left-3 text-indigo-400" />
        </div>
        <input
          type="number"
          name="experience"
          placeholder="Min Years Experience"
          className="w-full max-w-xs p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleFilterChange}
        />
      </div>

      <div className="bg-gradient-to-br from-white to-indigo-50 shadow-xl rounded-lg p-6 space-y-6">
        {resumes.length === 0 && <p className="text-center text-gray-500">No resumes found.</p>}
        {resumes.map(resume => (
          <div key={resume.id} className="border-b pb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p className="text-sm text-gray-700"><strong>Skills:</strong> {resume.skills}</p>
                <p className="text-sm text-gray-700"><strong>Experience:</strong> {resume.experience_years} year(s)</p>
              </div>
              <button
                onClick={() => setSelectedResume(resume.anonymized_text)}
                className="mt-2 md:mt-0 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow"
              >
                View Resume
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full relative shadow-2xl border-t-8 border-indigo-600">
            <button
              onClick={() => setSelectedResume(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">Anonymized Resume</h3>
            <div className="bg-gray-50 p-4 rounded-lg overflow-y-auto max-h-96 text-sm whitespace-pre-wrap text-gray-800">
              {selectedResume}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;