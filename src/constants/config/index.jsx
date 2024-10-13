const DEFAULT_PASSWORD = "123456";

const EMAIL_DOMAIN = "@kkorean.rice";

const USER_ROLE = Object.freeze({
    ADMIN: 2411,
    USER: 1308,
});

const PROTECTED_ROUTE = [];

const ADMIN_ROUTE = ["/dashboard"];

export {
    PROTECTED_ROUTE,
    ADMIN_ROUTE,
    DEFAULT_PASSWORD,
    EMAIL_DOMAIN,
    USER_ROLE,
};

