import { useEffect, useState } from 'react';
import api from '../services/api';

// Hårdkodat budget-id för testning — ersätts med riktigt id när JWT är implementerat
const BUDGET_ID = '00000000-0000-0000-0000-000000000001';

function TransactionForm() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    categoryId: '',
    amount: '',
    type: 'Expense',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Hämtar kategorier från backend så användaren kan välja kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/categories/${BUDGET_ID}`);
        setCategories(response.data);
        if (response.data.length > 0) {
          setForm((prev) => ({ ...prev, categoryId: response.data[0].id }));
        }
      } catch (err) {
        setError('Kunde inte hämta kategorier');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post('/transactions', {
        categoryId: form.categoryId,
        amount: parseFloat(form.amount),
        type: form.type,
        description: form.description,
        date: new Date(form.date).toISOString(),
      });
      setSuccess(true);
      // Återställer formuläret efter lyckad transaktion
      setForm({
        categoryId: categories.length > 0 ? categories[0].id : '',
        amount: '',
        type: 'Expense',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError('Kunde inte spara transaktionen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Ny transaktion</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4">Transaktionen sparades! ✓</p>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6">

          {/* Kategori */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Typ */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Typ
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="Expense">Utgift</option>
              <option value="Income">Inkomst</option>
            </select>
          </div>

          {/* Belopp */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Belopp (kr)
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Beskrivning */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beskrivning
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="t.ex. ICA Maxi"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Datum */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Sparar...' : 'Spara transaktion'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default TransactionForm;