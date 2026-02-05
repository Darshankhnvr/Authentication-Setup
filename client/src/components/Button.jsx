// Reusable button component
function Button({ text, ...props }) {
  return (
    <button
      className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition px-2 items-center"
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
