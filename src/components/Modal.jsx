// Återanvändbar Modal-komponent — används för bekräftelser och formulär i hela appen
function Modal({ isOpen, onClose, title, children }) {
  // Renderar ingenting om modalen inte är öppen
  if (!isOpen) return null;

  return (
    // Bakgrund — klick stänger modalen
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal-innehåll — stoppar klick från att bubbla upp till bakgrunden */}
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header med titel och stäng-knapp */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-medium"
          >
            ✕
          </button>
        </div>

        {/* Innehåll som skickas in via children */}
        {children}
      </div>
    </div>
  );
}

export default Modal;