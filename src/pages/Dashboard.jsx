import { useEffect, useState } from 'react';
import api from '../services/api';

// Hårdkodat budget-id för testning — ersätts med riktigt id när JWT är implementerat
const BUDGET_ID = '00000000-0000-0000-0000-000000000001';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get(`/budgets/summary/${BUDGET_ID}`);
        setSummary(response.data);
      } catch (err) {
        setError('Kunde inte hämta budgetsammanfattning');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p className="p-8">Laddar...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!summary) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Budgetinfo */}
      <h1 className="text-3xl font-bold mb-2">{summary.name}</h1>
      <p className="text-gray-500 mb-6">
        {summary.month}/{summary.year}
      </p>

      {/* Summakort */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total budget</p>
          <p className="text-xl font-semibold">{summary.totalAmount} kr</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Spenderat</p>
          <p className="text-xl font-semibold text-red-500">{summary.totalSpent} kr</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Kvar</p>
          <p className="text-xl font-semibold text-green-600">{summary.remainingAmount} kr</p>
        </div>
      </div>

      {/* Kategorier */}
      <h2 className="text-xl font-semibold mb-4">Kategorier</h2>
      {summary.categories.map((category) => (
        <div key={category.id} className="bg-white border rounded-lg p-4 mb-3">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{category.name}</p>
            <p className="text-sm text-gray-500">
              {category.currentBalance} / {category.allocatedAmount} kr
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${Math.min(
                  (category.currentBalance / category.allocatedAmount) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Spenderat: {category.amountSpent} kr
          </p>
          {category.isWeekly && (
            <p className="text-sm text-blue-500 mt-1">
              Veckobudget: {category.weeklyAmount} kr/vecka
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;