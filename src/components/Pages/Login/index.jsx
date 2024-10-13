import React from "react";
import { Box, Image } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { LoginForm } from "@/components/Organisms/Form";
const LoginPage = () => {
    return (
        <Box className="bg-gray-50 h-screen flex">
            <LoginForm />
            <Image
                src={FileHelpers.getLocalFile("bg-login", "jpg")}
                alt="Login Illustration"
                className="w-1/2 h-screen object-cover hidden lg:block"
            />
        </Box>
    );
};

export default LoginPage;
