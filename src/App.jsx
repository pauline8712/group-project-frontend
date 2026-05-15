import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import TransactionForm from './pages/TransactionForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-transaction" element={<TransactionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;