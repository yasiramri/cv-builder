import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

function parseAnalysis(text) {
  // Ambil SCORE
  const scoreMatch = text.match(/SCORE:\s*(\d+)/i);
  const score = scoreMatch ? scoreMatch[1] : '';

  // Ambil INTERPRETATION
  const interpretationMatch = text.match(
    /INTERPRETATION:\s*(.+?)\n(STRENGTHS:|\nWEAKNESSES:|\nSUGGESTIONS:|$)/is
  );
  const interpretation = interpretationMatch
    ? interpretationMatch[1].trim()
    : '';

  // Ambil STRENGTHS (antara STRENGTHS: dan WEAKNESSES:)
  const strengthsMatch = text.match(
    /STRENGTHS:\s*((?:.|\n)*?)(?:WEAKNESSES:|SUGGESTIONS:|$)/i
  );
  let strengths = [];
  if (strengthsMatch) {
    strengths = strengthsMatch[1]
      .split('\n')
      .map((l) => l.replace(/^[-*]\s*/, '').trim())
      .filter((l) => l.length > 0);
  }

  // Ambil WEAKNESSES (antara WEAKNESSES: dan SUGGESTIONS:)
  const weaknessesMatch = text.match(
    /WEAKNESSES:\s*((?:.|\n)*?)(?:SUGGESTIONS:|$)/i
  );
  let weaknesses = [];
  if (weaknessesMatch) {
    weaknesses = weaknessesMatch[1]
      .split('\n')
      .map((l) => l.replace(/^[-*]\s*/, '').trim())
      .filter((l) => l.length > 0);
  }

  // Ambil SUGGESTIONS (dari SUGGESTIONS: sampai akhir)
  const suggestionsMatch = text.match(/SUGGESTIONS:\s*((?:.|\n)*)$/i);
  let suggestions = [];
  if (suggestionsMatch) {
    suggestions = suggestionsMatch[1]
      .split(/\n\d+\.\s+/)
      .map((l) => l.replace(/^\d+\.\s*/, '').trim())
      .filter((l) => l.length > 0);
  }

  return { score, interpretation, strengths, weaknesses, suggestions };
}
console.log(parseAnalysis);

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
      setErrorMessage('');
      setAnalysisResult('');
      const response = await fetch(`${API_URL}/api/analyze-cv`, {
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

            {analysisResult &&
              (() => {
                // Parsing hasil analisis
                const {
                  score,
                  interpretation,
                  strengths,
                  weaknesses,
                  suggestions,
                } = parseAnalysis(analysisResult);

                return (
                  <div
                    className="mt-4 p-4 border rounded bg-white"
                    style={{ maxWidth: 700 }}
                  >
                    <h5 className="mb-4">
                      <span role="img" aria-label="AI">
                        🤖
                      </span>{' '}
                      Hasil Analisis ATS
                    </h5>
                    <div
                      className="d-flex align-items-center mb-4"
                      style={{ gap: 24 }}
                    >
                      <div
                        className="text-center rounded"
                        style={{
                          background: '#232a36',
                          color: '#fff',
                          width: 300,
                          height: 100,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          fontSize: 32,
                          fontWeight: 'bold',
                          flexShrink: 0,
                        }}
                      >
                        {score || '-'}
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 'normal',
                            marginTop: 8,
                          }}
                        >
                          Skor ATS
                        </div>
                      </div>
                      <div>
                        <b>Interpretasi Skor:</b>
                        <div>{interpretation || '-'}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <b>
                        <span role="img" aria-label="Strengths">
                          ✔️
                        </span>{' '}
                        Kelebihan
                      </b>
                      <ul className="mt-2">
                        {strengths.length > 0 ? (
                          strengths.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                    <div className="mb-3">
                      <b>
                        <span role="img" aria-label="Weaknesses">
                          ⚠️
                        </span>{' '}
                        Kekurangan
                      </b>
                      <ul className="mt-2">
                        {weaknesses.length > 0 ? (
                          weaknesses.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <b>
                        <span role="img" aria-label="Suggestions">
                          💡
                        </span>{' '}
                        Saran Perbaikan
                      </b>
                      <ul className="mt-2">
                        {suggestions.length > 0 ? (
                          suggestions.map((item, idx) => (
                            <li key={idx}>
                              {/* Render bold jika ada tanda ** */}
                              {item
                                .split(/(\*\*.+?\*\*)/g)
                                .map((part, i) =>
                                  part.startsWith('**') &&
                                  part.endsWith('**') ? (
                                    <b key={i}>{part.replace(/\*\*/g, '')}</b>
                                  ) : (
                                    part
                                  )
                                )}
                            </li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSection;
