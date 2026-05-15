// Återanvändbar ProgressBar-komponent — används i CategoryCard och Dashboard
function ProgressBar({ current, allocated }) {
  // Beräknar procent kvar av budgeten
  const percent = Math.min((current / allocated) * 100, 100);

  // Väljer färg baserat på hur mycket som är kvar
  const getColor = () => {
    if (percent > 50) return 'bg-green-500';
    if (percent > 20) return 'bg-amber-400';
    return 'bg-red-500';
  };

  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full ${getColor()}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;