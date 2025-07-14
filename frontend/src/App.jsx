import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Estimate from './pages/Estimate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/estimate" element={<Estimate />} />
    </Routes>
  );
}

export default App;
