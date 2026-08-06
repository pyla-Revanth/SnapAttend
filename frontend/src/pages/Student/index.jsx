import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";
import CameraInput from "../../components/CameraInput";

function Student() {

    const navigate = useNavigate();

    return (
      <div
        className="
          min-h-screen
          bg-[#E0E3FF]
          px-8
          py-8
          flex
          flex-col
          items-center
        "
      >
          <div
            className="
              w-full
              max-w-2xl
              flex
              justify-between
              items-center
              
            "
          >
              <DashboardHeader />

              <Button
                text="Go Back Home (⌘ + 🔙)"
                variant="secondary"
                onClick={() => navigate("/")}
              />

          </div>

          <h2
              className="
                  mt-8
                  mb-6
                  text-center
                  text-2xl
                  text-black
                  font-['Climate_Crisis']
              "
          >
              Login using Face ID
          </h2>

          <div
              className="
                  w-full
                  max-w-2xl
              "
          >

              <CameraInput />

          </div>
        
      </div>
    );
}

export default Student;