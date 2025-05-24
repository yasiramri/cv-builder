import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CVBuilderPage from './pages/CVBuilderPage';
import CVtotal from './pages/CVtotal';

// Komponen sederhana untuk 404
function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>404 Not Found</h1>
      <img
        src="https://http.cat/404"
        alt="404 Not Found"
        style={{ maxWidth: 600, width: '100%' }}
      />
      <p>Oops, halaman yang kamu cari tidak ditemukan.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv-list" element={<CVtotal />} />
        {/* <Route path="/cv-builder-pro" element={<CVBuilderPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
