import { useEffect, useState } from 'react';
import api from '../services/api';
import CategoryCard from '../components/CategoryCard';

// Hårdkodat budget-id för testning — ersätts med riktigt id när JWT är implementerat
const BUDGET_ID = '00000000-0000-0000-0000-000000000001';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/categories/${BUDGET_ID}`);
        setCategories(response.data);
      } catch (err) {
        setError('Kunde inte hämta kategorier');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="p-8">Laddar...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Kategorier</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Använder återanvändbar CategoryCard */}
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories;