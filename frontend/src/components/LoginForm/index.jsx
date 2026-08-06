import { useState } from "react";
import toast from "react-hot-toast";
import KeyIcon from "@mui/icons-material/Key";

import { loginTeacher } from "../../api/teacherApi";

import Card from "../Card";
import Input from "../Input";
import Button from "../Button";

function LoginForm({ setAuthMode, onLoginSuccess }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        const { username, password } = formData;

        if (!username || !password) {
            toast.error("Username and Password are required.");
            return;
        }

        try {
            setIsLoading(true);

            const response = await loginTeacher({
                username,
                password,
            });

            localStorage.setItem("token", response.token);

            toast.success("Login successful!");

            setTimeout(() => {
                onLoginSuccess();
            }, 1000);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <h2
                className="
                    text-2xl
                    text-center
                    text-black
                    font-['Climate_Crisis']
                "
            >
                Login using Password
            </h2>

            <div className="flex flex-col gap-2">
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
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex gap-4">
                <Button
                    text={isLoading ? "Logging In..." : "Login"}
                    icon={<KeyIcon fontSize="small" />}
                    className="flex-1"
                    onClick={handleLogin}
                    disabled={isLoading}
                />

                <Button
                    text="Register Instead"
                    icon={<KeyIcon fontSize="small" />}
                    className="flex-1"
                    onClick={() => setAuthMode("register")}
                    disabled={isLoading}
                />
            </div>
        </Card>
    );
}

export default LoginForm;