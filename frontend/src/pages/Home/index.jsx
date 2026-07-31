import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function Home() {
  const navigate = useNavigate();

  const portals = [
    {
      title: "Student",
      image:
        "https://res.cloudinary.com/dfokmy0ny/image/upload/v1785046623/Picsart_26-07-26_11-45-21-590_pvto1s.png",
      buttonText: "Student Portal ",
      route: "/student",
    },
    {
      title: "Teacher",
      image:
        "https://res.cloudinary.com/dfokmy0ny/image/upload/v1785046577/Picsart_26-07-26_11-45-39-062_lgmklw.png",
      buttonText: "Teacher Portal ",
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
          gap-10
        "
      >
        {portals.map((portal) => (
          <Card key={portal.route}>
            <h2 className="ml-5 font-['Climate_Crisis'] text-2xl">I'm<br/>{portal.title}</h2>

            <img
              src={portal.image}
              alt={portal.title}
              className="w-40"
            />

            <Button
              text={portal.buttonText}
              variant="primary"
              onClick={() => navigate(portal.route)}
              icon={<ArrowOutwardIcon fontSize="small" />}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;