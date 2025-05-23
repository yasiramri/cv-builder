import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const CVSection = () => {
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setErrorMessage('❌ Hanya file PDF yang diperbolehkan.');
      setFile(null);
      setAnalysisResult('');
      return;
    }

    setFile(selectedFile);
    setErrorMessage('');
    setAnalysisResult('');
  };

  const handleAnalyzeCV = async () => {
    if (!file) {
      setErrorMessage(
        '❌ Silakan upload file CV berformat PDF terlebih dahulu.'
      );
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}}/api/analyze-cv`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult(`❌ Gagal: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setAnalysisResult('❌ Terjadi kesalahan saat menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* CV Builder (opsional / dummy) */}
        <div className="col-12 col-md-6">
          <div className="p-4 rounded shadow-sm h-100">
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
            <button className="btn btn-dark w-100" disabled>
              Generate CV (Coming Soon)
            </button>
          </div>
        </div>

        {/* CV Analyzer */}
        <div className="col-12 col-md-6">
          <div className="p-4 rounded shadow-sm h-100">
            <h4 className="mb-4">CV Analyzer (PDF Only)</h4>
            <div
              className="border border-dashed text-center p-5 mb-3"
              style={{
                borderStyle: 'dashed',
                borderColor: '#ccc',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => document.getElementById('cv-upload').click()}
            >
              <FaCloudUploadAlt size={40} className="mb-2" />
              <p className="mb-0">
                {file
                  ? `📎 ${file.name}`
                  : 'Klik atau drop file CV (PDF) di sini'}
              </p>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                hidden
              />
            </div>

            {errorMessage && (
              <div className="alert alert-danger py-2 small">
                {errorMessage}
              </div>
            )}

            <button
              className="btn btn-dark w-100"
              onClick={handleAnalyzeCV}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze CV'}
            </button>

            {analysisResult && (
              <div className="mt-4 p-3 border rounded bg-light">
                <h6>Hasil Analisis ATS:</h6>
                <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {analysisResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSection;
