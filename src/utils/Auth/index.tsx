interface User {
    // Define the structure of the user object based on your application
    email?: string;
    fullName?: string;
    role?: string;
    // Add any other properties that are part of the user object
}

const AuthUtils = {
    login: (user: User = {}): User => {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    },
    getUser: (): User | null => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },
    logout: (): boolean => {
        try {
            localStorage.removeItem("user");
            return true;
        } catch (err) {
            console.error("Error during logout:", err); // Log the error for debugging
            return false;
        }
    },
};

export default AuthUtils;
