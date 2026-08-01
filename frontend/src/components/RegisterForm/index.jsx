
import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import KeyIcon from "@mui/icons-material/Key";

function RegisterForm({ setAuthMode }) {
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
            Register your teacher profile
        </h2>

        <div className="flex flex-col gap-2">
            <Input
                id="teacher-register-username"
                label="Username"
                placeholder="Enter your username"
            />

            <Input
                id="teacher-name"
                label="Name"
                placeholder="Enter your name"
            />

            <Input
                id="teacher-register-password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />

            <Input
                id="teacher-confirm-password"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
            />
        </div>
        
        <div className="flex gap-4 mt-2">
            <Button
                text="Register Now"
                icon={<KeyIcon fontSize="small" />}
                className="flex-1"
            />

            <Button
                text="Login Instead"
                className="flex-1"
                icon={<KeyIcon fontSize="small" />}
                onClick={() => setAuthMode("login")}
            />
        </div>
    </Card>
  );
}

export default RegisterForm;