/**
 * Массив маршрутов, которые используются для аутентификации
 * Эти маршруты перенаправят зарегистрированных пользователей на путь по умолчанию
 * @type {string[]}
 */
export const authRoutes = ["/auth"];

/**
 * Префикс для маршрутов аутентификации API
 * Маршруты, начинающиеся с этого префикса, используются для целей аутентификации по API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Путь перенаправления по умолчанию после входа в систему
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
