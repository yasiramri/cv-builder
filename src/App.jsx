import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CVBuilderPage from './pages/CVBuilderPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv-builder" element={<CVBuilderPage />} />
      </Routes>
    </div>
  );
}

export default App;
