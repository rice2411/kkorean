const DEFAULT_PASSWORD: string = "123456";

const EMAIL_DOMAIN: string = "@kkorean.rice";

const USER_ROLE = Object.freeze({
    ADMIN: 2411 as const,
    USER: 1308 as const,
});

const PROTECTED_ROUTE: string[] = [];

const ADMIN_ROUTE: string[] = ["/dashboard"];

const WEB_TITLE = "KKorean";

export {
    PROTECTED_ROUTE,
    ADMIN_ROUTE,
    DEFAULT_PASSWORD,
    EMAIL_DOMAIN,
    USER_ROLE,
    WEB_TITLE,
};
