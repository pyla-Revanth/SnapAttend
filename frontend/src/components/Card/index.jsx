function Card({ children, className = "" }) {
    return (
        <div
            className={`
                bg-[#E0E3FF]
                p-9
                rounded-[4rem]
                flex
                flex-col
                justify-center
                gap-4
                font-['Outfit']
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;