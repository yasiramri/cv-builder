import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const CVSection = () => {
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* CV Builder */}
        <div className="col-12 col-md-6">
          <div className="p-4 rounded shadow-sm h-100 mr">
            <h4 className="mb-4">CV Builder</h4>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Muhammad Yasir Amri"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Professional Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Experience</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Your work experience..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <button className="btn btn-dark w-100">Generate CV</button>
          </div>
        </div>

        {/* CV Checker */}
        <div className="col-12 col-md-6">
          <div className="p-4 rounded shadow-sm h-100">
            <h4 className="mb-4">CV Checker</h4>
            <div
              className="border border-dashed text-center p-5 mb-3"
              style={{
                borderStyle: 'dashed',
                borderColor: '#ccc',
                borderRadius: '10px',
              }}
              onClick={() => document.getElementById('cv-upload').click()}
            >
              <FaCloudUploadAlt size={40} className="mb-2" />
              <p className="mb-0">Drop your CV here or click to upload</p>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                hidden
              />
            </div>
            <button className="btn btn-dark w-100">Analyze CV</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSection;
