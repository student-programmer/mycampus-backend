import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ApplicationModule} from './modules/app.module';
import {CommonModule, LogInterceptor} from './modules/common';

/**
 * These are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
const API_DEFAULT_PORT = 4000;
const API_DEFAULT_PREFIX = '/api/v1/';

/**
 * The defaults below are dedicated to Swagger configuration, change them
 * following your needs (change at least the title & description).
 *
 * @todo Change the constants below following your API requirements
 */
const SWAGGER_TITLE = 'MYC API';
const SWAGGER_DESCRIPTION = 'API used for MYC server';
const SWAGGER_PREFIX = '/docs';

/**
 * Register a Swagger module in the NestJS application.
 * This method mutates the given `app` to register a new module dedicated to
 * Swagger API documentation. Any request performed on `SWAGGER_PREFIX` will
 * receive a documentation page as response.
 *
 * @todo See the `nestjs/swagger` NPM package documentation to customize the
 *       code below with API keys, security requirements, tags and more.
 */
function createSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .addBearerAuth(
            {
                // I was also testing it without prefix 'Bearer ' before the JWT
                description: 'Please enter token in following format: Bearer [your JWT]',
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header'
            },
            'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

/**
 * Build & bootstrap the NestJS API.
 * This method is the starting point of the API; it registers the application
 * module and registers essential components such as the logger and request
 * parsing middleware.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(
        ApplicationModule,
        new FastifyAdapter()
    );

    // @todo Enable Helmet for better API security headers

    app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

    if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
        createSwagger(app);
    }

    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    });

    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);

    await app.listen(process.env.API_PORT || API_DEFAULT_PORT, '0.0.0.0');
}

/**
 * It is now time to turn the lights on!
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 *
 * @todo It is often advised to enhance the code below with an exception-catching
 *       service for better error handling in production environments.
 */
bootstrap().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);

    const defaultExitCode = 1;
    process.exit(defaultExitCode);
});
