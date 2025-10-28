function Button({ variant = 'primary', children, className = '', onClick, ...rest }) {
  const baseClasses =
    'relative overflow-hidden font-semibold transition-all duration-300 cursor-pointer select-none inline-flex items-center justify-center px-6 py-2.5 rounded-lg';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    secondary:
      'bg-gray-700 text-white hover:bg-gray-600',
    outline:
      'bg-transparent text-white border border-gray-600 hover:border-gray-400 hover:bg-gray-800/50',
  };

  return (
    <button
      type={rest.type || 'button'}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
