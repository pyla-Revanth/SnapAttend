import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import KeyIcon from "@mui/icons-material/Key";

function LoginForm({ setAuthMode }) {
  return (
    <Card>

        <h2
            className="
                font-['Climate_Crisis']
                text-2xl
                text-center
                text-black
                
            "
        >
            Login using Password
        </h2>

        <div className="flex flex-col gap-2 ">
            <Input
                id="teacher-username"
                label="Username"
                placeholder="Enter your username"
            />

            <Input
                id="teacher-password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />
        </div>

        <hr className="my-2 border-gray-300" />

        <div className="flex gap-4">
            <Button text="Login" 
                icon={<KeyIcon fontSize="small" />}
                className="flex-1" />

            <Button 
                text="Register Instead"    
                onClick={() => setAuthMode("register")}
                icon={<KeyIcon fontSize="small" />}
                className="flex-1"
            />
        </div>

    </Card>
  );
}

export default LoginForm;