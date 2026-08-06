function Button({
    text,
    onClick,
    variant = "primary",
    icon,
    className = "",
    type = "button",
    disabled = false,
}) {
    const baseStyle = `
        flex
        items-center
        justify-center
        gap-2
        px-18
        py-3
        rounded-3xl
        font-medium
        font-['Outfit']
        transition
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
    `;

    const variants = {
        primary: "bg-[#5865F2] text-white hover:bg-[#4753d6] hover:scale-105",
        secondary: "bg-[#EB459E] text-white hover:bg-[#d13b8b] hover:scale-105",
        dark: "bg-black text-white hover:bg-gray-800 hover:scale-105",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            <span>{text}</span>

            {icon && <span>{icon}</span>}
        </button>
    );
}

export default Button;