
function Button({ text, onClick,variant = "primary", icon }) {

  const baseStyle = "px-20 py-3 rounded-3xl font-medium transition duration-300 hover:scale-105 font-['Outfit']";
  
  const variants = {
    primary: "bg-[#5865F2] text-white hover:bg-[#4753d6]",
    secondary: "bg-[#EB459E] text-white hover:bg-[#d13b8b]",
    dark: "bg-black text-white hover:bg-gray-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {text}
      {icon}
    </button>
  );
}

export default Button;