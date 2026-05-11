import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from './pages/Categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;