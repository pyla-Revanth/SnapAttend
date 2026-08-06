const LOGO_URL =
    "https://res.cloudinary.com/dfokmy0ny/image/upload/v1785044896/Picsart_26-07-26_11-13-22-360_xixgu1.png";

function Header() {
    return (
        <header
            className="
                flex
                flex-col
                items-center
                mb-10
            "
        >
            <img
                src={LOGO_URL}
                alt="SnapAttend Logo"
                className="h-20 mb-2"
            />

            <h1
                className="
                    text-5xl
                    font-['Climate_Crisis']
                    font-black
                    text-[#E0E3FF]
                    text-center
                    leading-none
                "
            >
                SNAP
                <br />
                ATTEND
            </h1>
        </header>
    );
}

export default Header;