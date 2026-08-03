function Input({
    id,
    name,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}) {
    return (
        <div className="flex flex-col gap-2">

            <label
                htmlFor={id}
                className="
                    font-['Outfit']
                    text-gray-800
                    font-medium
                    text-base
                "
            >
                {label}
            </label>

            <input
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-xl
                    px-4
                    py-3
                    bg-white
                    border
                    border-gray-300
                    text-black
                    font-['Outfit']
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#5865F2]
                    focus:ring-2
                    focus:ring-[#5865F2]/20
                "
            />

        </div>
    );
}

export default Input;