// Återanvändbar Button-komponent — används i hela appen
function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  const base = 'w-full rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50';

  const variants = {
    // Primär knapp — mörk bakgrund
    primary: 'bg-gray-900 text-white hover:bg-gray-700',
    // Sekundär knapp — vit bakgrund med border
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50',
    // Danger knapp — röd för borttagning
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;