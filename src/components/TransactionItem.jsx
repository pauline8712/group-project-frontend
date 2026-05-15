// Återanvändbar TransactionItem-komponent — visar en enskild transaktion i en lista
function TransactionItem({ transaction }) {
  const isExpense = transaction.type === 'Expense';

  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <div>
        {/* Beskrivning och datum */}
        <p className="text-sm font-medium text-gray-900">{transaction.description || 'Ingen beskrivning'}</p>
        <p className="text-xs text-gray-400">
          {new Date(transaction.date).toLocaleDateString('sv-SE')}
        </p>
      </div>

      {/* Belopp — rött för utgift, grönt för inkomst */}
      <p className={`text-sm font-medium ${isExpense ? 'text-red-500' : 'text-green-600'}`}>
        {isExpense ? '-' : '+'}{transaction.amount.toLocaleString('sv-SE')} kr
      </p>
    </div>
  );
}

export default TransactionItem;