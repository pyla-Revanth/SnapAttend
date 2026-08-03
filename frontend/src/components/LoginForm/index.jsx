import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import KeyIcon from "@mui/icons-material/Key";
import { loginTeacher } from "../../api/teacherApi.js";
import toast from "react-hot-toast";
import { useState } from "react";

function LoginForm({ setAuthMode, onLoginSuccess }) {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {

        const { username, password } = formData;

        if (!username || !password) {
            toast.error("Username and Password are required.");
            return;
        }

        try {

            const response = await loginTeacher({
                username,
                password,
            });

            localStorage.setItem("token", response.token);

            toast.success("Login successful!");

            // Navigate to Dashboard
            setTimeout(() => {
                onLoginSuccess();
            }, 1000);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed."
            );

        }

    };

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
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <Input
                    id="teacher-password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />

            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex gap-4">
                <Button text="Login" 
                    icon={<KeyIcon fontSize="small" />}
                    className="flex-1"
                    onClick={handleLogin}
                />

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