/**
 * Reusable Button component with modern premium styling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Button label text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
function Button({ text, className = "", ...props }) {
  return (
    <button
      className={`btn-primary w-full ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
