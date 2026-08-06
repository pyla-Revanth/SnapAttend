import { useState } from "react";
import toast from "react-hot-toast";
import KeyIcon from "@mui/icons-material/Key";

import { registerTeacher } from "../../api/teacherApi";

import Card from "../Card";
import Input from "../Input";
import Button from "../Button";

function RegisterForm({ setAuthMode }) {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRegister = async () => {
        const {
            username,
            name,
            password,
            confirmPassword,
        } = formData;

        if (
            !username ||
            !name ||
            !password ||
            !confirmPassword
        ) {
            toast.error("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);

            const response = await registerTeacher({
                username,
                name,
                password,
            });

            toast.success(response.message);

            setTimeout(() => {
                setAuthMode("login");
            }, 1500);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed."
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
                Register your teacher profile
            </h2>

            <div className="flex flex-col gap-2">
                <Input
                    id="teacher-register-username"
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <Input
                    id="teacher-name"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <Input
                    id="teacher-register-password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Input
                    id="teacher-confirm-password"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-2 flex gap-4">
                <Button
                    text={isLoading ? "Registering..." : "Register Now"}
                    icon={<KeyIcon fontSize="small" />}
                    className="flex-1"
                    onClick={handleRegister}
                    disabled={isLoading}
                />

                <Button
                    text="Login Instead"
                    icon={<KeyIcon fontSize="small" />}
                    className="flex-1"
                    onClick={() => setAuthMode("login")}
                    disabled={isLoading}
                />
            </div>
        </Card>
    );
}

export default RegisterForm;