import LaravelEchoServer from 'laravel-echo-server';

import {
    AUTH_HOST,
    AUTH_ENDPOINT,
    ENABLE_HTTP,
    ENABLE_REDIS,
    DATABASE,
    SQLITE_DB_PATH,
    ALLOW_CORS,
    ALLOW_ORIGIN,
    ALLOW_METHODS,
    ALLOW_HEADERS,
    DEV_MODE,
    useRedis,
} from './config/env';

import clients from './config/clients';

const redis = useRedis ? require('./config/redis').default : {};

LaravelEchoServer.run({
    authHost: AUTH_HOST,
    authEndpoint: AUTH_ENDPOINT,
    clients,
    database: DATABASE,
    databaseConfig: {
        redis,
        sqlite: {
            databasePath: SQLITE_DB_PATH,
        },
    },
    devMode: DEV_MODE,
    host: null,
    port: 6001,
    protocol: 'http',
    subscribers: {
        http: ENABLE_HTTP,
        redis: ENABLE_REDIS,
    },
    apiOriginAllow: {
        allowCors: ALLOW_CORS,
        allowOrigin: ALLOW_ORIGIN,
        allowMethods: ALLOW_METHODS,
        allowHeaders: ALLOW_HEADERS,
    },
})
