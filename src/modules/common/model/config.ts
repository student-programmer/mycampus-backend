export interface Config {

    readonly API_PORT: number;

    readonly API_PREFIX: string;

    readonly CLIENT_URL: string;

    readonly SWAGGER_ENABLE: number;

    readonly JWT_SECRET: string;

    readonly JWT_ISSUER: string;

    readonly HEALTH_TOKEN: string;

    readonly JWT_EXPIRATION_TIME: number;

    readonly SALT_ROUNDS: number;

}
