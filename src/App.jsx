import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CVBuilderPage from './pages/CVBuilderPage';
import CVtotal from './pages/CVtotal';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv-builder" element={<CVBuilderPage />} />
        <Route path="/cv-list" element={<CVtotal />} />
      </Routes>
    </div>
  );
}

export default App;
