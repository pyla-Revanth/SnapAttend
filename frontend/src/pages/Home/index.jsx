import Header from "../../components/Header";
import PortalCard from "../../components/PortalCard";

function Home() {

    const portals = [
      {
        title: "Student",
        image: "https://res.cloudinary.com/dfokmy0ny/image/upload/v1785046623/Picsart_26-07-26_11-45-21-590_pvto1s.png",
        buttonText: "Student Portal",
        route: "/student",
      },
      {
        title: "Teacher",
        image: "https://res.cloudinary.com/dfokmy0ny/image/upload/v1785046577/Picsart_26-07-26_11-45-39-062_lgmklw.png",
        buttonText: "Teacher Portal",
        route: "/teacher",
      },
    ];

    return (

      <div
          className="
            min-h-screen
            bg-[#5865F2]
            flex
            flex-col
            items-center
            justify-center
            px-6
          "
      >
        <Header />

        <div
            className="
                mt-6
                flex
                flex-col
                md:flex-row
                gap-10
            "
        >

            {portals.map((portal) => (
                <PortalCard
                    key={portal.route}
                    portal={portal}
                />
            ))}

        </div>

      </div>

    );
}

export default Home;