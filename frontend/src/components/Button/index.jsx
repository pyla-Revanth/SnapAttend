
function Button({ text, onClick,variant = "primary", icon ,className = ""}) {

  const baseStyle = `
      flex
      items-center
      justify-center
      gap-2
      py-3
      px-18
      rounded-3xl
      font-medium
      transition
      duration-300
      hover:scale-105
      font-['Outfit']
      `;  

    const variants = {
      primary: "bg-[#5865F2] text-white hover:bg-[#4753d6]",
      secondary: "bg-[#EB459E] text-white hover:bg-[#d13b8b]",
      dark: "bg-black text-white hover:bg-gray-800",
    };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
}

export default Button;