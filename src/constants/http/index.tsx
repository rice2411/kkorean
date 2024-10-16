const HTTP_STATUS_CODE = Object.freeze({
    OK: 200 as const,
    CREATED: 201 as const,
    ACCEPTED: 202 as const,
    NO_CONTENT: 204 as const,
    BAD_REQUEST: 400 as const,
    UNAUTHORIZED: 401 as const,
    FORBIDDEN: 403 as const,
    NOT_FOUND: 404 as const,
    METHOD_NOT_ALLOWED: 405 as const,
    CONFLICT: 409 as const,
    INTERNAL_SERVER_ERROR: 500 as const,
    NOT_IMPLEMENTED: 501 as const,
    BAD_GATEWAY: 502 as const,
    SERVICE_UNAVAILABLE: 503 as const,
    GATEWAY_TIMEOUT: 504 as const,
    UNKNOW_ERROR: 520 as const,
});

export { HTTP_STATUS_CODE };
