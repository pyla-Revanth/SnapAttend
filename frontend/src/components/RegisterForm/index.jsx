import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import KeyIcon from "@mui/icons-material/Key";
import { registerTeacher } from "../../api/teacherApi.js";
import toast from "react-hot-toast";

function RegisterForm({ setAuthMode }) {

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {

        const {
            username,
            name,
            password,
            confirmPassword,
        } = formData;

        // Empty field validation
        if (
            !username ||
            !name ||
            !password ||
            !confirmPassword
        ) {
            toast.error("All fields are required.");
            return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {

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
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Input
                    id="teacher-confirm-password"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            
            <div className="flex gap-4 mt-2">
                <Button
                    text="Register Now"
                    icon={<KeyIcon fontSize="small" />}
                    className="flex-1"
                    onClick={handleRegister}
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