import { useNavigate } from "react-router-dom"
import Button from "../../components/Button";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <h1>SnapAttend</h1>

            <Button 
                text="Teacher"
                onClick={()=> navigate("/teacher")}
            />

            <Button 
                text="Student"
                onClick={()=> navigate("/student")}
            />

        </>
    );
}

export default Home;