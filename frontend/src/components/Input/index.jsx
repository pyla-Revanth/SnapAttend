function Input({
    id,
    label,
    type = "text",
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-2">

            <label
                htmlFor={label}
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
                id={label}
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
                type={type}
                placeholder={placeholder}
            />

        </div>
    );
}

export default Input;