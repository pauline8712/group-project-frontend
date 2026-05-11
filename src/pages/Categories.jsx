import { useEffect, useState } from 'react';
import api from '../services/api';

const BUDGET_ID = '00000000-0000-0000-0000-000000000001';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/categories/${BUDGET_ID}`);
        setCategories(response.data);
      } catch (err) {
        setError('Kunde inte hämta kategorier');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kategorier</h1>
      {error && <p className="text-red-500">{error}</p>}
      {categories.map((category) => (
        <div key={category.id} className="border p-4 mb-2 rounded">
          <p className="font-semibold">{category.name}</p>
          <p>Budget: {category.allocatedAmount} kr</p>
          <p>Saldo: {category.currentBalance} kr</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;