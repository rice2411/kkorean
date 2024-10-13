const AuthUtils = {
    login: (user) => {
        const param = user || {};
        localStorage.setItem("user", JSON.stringify(param));
        return param;
    },
    getUser: () => {
        const user = localStorage.getItem("user");
        return JSON.parse(user) || null;
    },
    logout: () => {
        try {
            localStorage.removeItem("user");
            return true;
        } catch (err) {
            return false;
        }
    },
};

export default AuthUtils;
