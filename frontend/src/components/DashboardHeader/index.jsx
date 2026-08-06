const LOGO_URL =
    "https://res.cloudinary.com/dfokmy0ny/image/upload/v1785044896/Picsart_26-07-26_11-13-22-360_xixgu1.png";

function DashboardHeader() {
    return (
        <header
            className="
                flex
                items-center
                justify-center
                gap-3
            "
        >
            <img
                src={LOGO_URL}
                alt="SnapAttend Logo"
                className="h-20"
            />

            <h2
                className="
                    text-4xl
                    font-['Climate_Crisis']
                    text-[#5865F2]
                    leading-none
                "
            >
                SNAP
                <br />
                ATTEND
            </h2>
        </header>
    );
}

export default DashboardHeader;