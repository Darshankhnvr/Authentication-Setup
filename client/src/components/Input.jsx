/**
 * Reusable Input component with modern glassmorphic styling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} [props.type] - HTML input type (default: "text")
 * @returns {JSX.Element}
 */
function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground/70 ml-1">
        {label}
      </label>

      <input
        type={type}
        className="glass-input w-full"
        {...props}
      />
    </div>
  );
}

export default Input;
