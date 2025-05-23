import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3001';

const CVList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/list-cv`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFiles(data.files);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!files.length) return <div>Tidak ada file CV yang tersimpan.</div>;

  return (
    <div className="container py-4">
      <h4 className="mb-4">Daftar CV yang Di-upload</h4>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama File</th>
            <th>Waktu Upload</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => (
            <tr key={file.filename}>
              <td>{idx + 1}</td>
              <td>{file.filename}</td>
              <td>
                {file.uploadedAt
                  ? new Date(file.uploadedAt).toLocaleString()
                  : '-'}
              </td>
              <td>
                {/* Tombol Lihat (open in new tab) */}
                <a
                  href={`${API_URL}${file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary me-2"
                >
                  Lihat
                </a>
                {/* Tombol Download */}
                <a
                  href={`${API_URL}${file.url}`}
                  download={file.filename}
                  className="btn btn-sm btn-success"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CVList;
