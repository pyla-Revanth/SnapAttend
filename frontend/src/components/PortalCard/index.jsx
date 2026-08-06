import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import Card from "../Card";
import Button from "../Button";

function PortalCard({ portal }) {

    const navigate = useNavigate();

    return (

        <Card>

            <h2
                className="
                    ml-5
                    font-['Climate_Crisis']
                    text-2xl
                "
            >
                I'm
                <br />
                {portal.title}
            </h2>

            <img
                src={portal.image}
                alt={`${portal.title} Portal`}
                className="
                    w-40
                    h-40
                    object-contain
                "
            />

            <Button
                text={portal.buttonText}
                icon={<ArrowOutwardIcon fontSize="small" />}
                onClick={() => navigate(portal.route)}
            />

        </Card>

    );

}

export default PortalCard;