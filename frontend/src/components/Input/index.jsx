function Input({
    id,
    name,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    disabled = false,
    autoComplete = "off",
    className = "",
}) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="
                    text-base
                    font-medium
                    font-['Outfit']
                    text-gray-800
                "
            >
                {label}
            </label>

            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    text-black
                    font-['Outfit']
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#5865F2]
                    focus:ring-2
                    focus:ring-[#5865F2]/20
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                    ${className}
                `}
            />
        </div>
    );
}

export default Input;