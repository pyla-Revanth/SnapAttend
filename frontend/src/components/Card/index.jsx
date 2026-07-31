function Card({ children }) {
  return (
    <div
      className="
        bg-[#E0E3FF]
        p-9
        font-['Outfit']
        rounded-[4rem]
        flex
        flex-col
        gap-4
        justify-center
      "
    >
      {children}
    </div>
  );
}

export default Card;