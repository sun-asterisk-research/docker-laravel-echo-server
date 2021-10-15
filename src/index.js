import LaravelEchoServer from './server/echo-server';

import {
    HOST,
    PORT,
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
    ENABLE_METRICS,
    COLLECT_DEFAULT_METRICS,
    METRICS_PATH,
    METRICS_PORT,
    DEV_MODE,
    useRedis,
} from './config/env';

import clients from './config/clients';

const redis = useRedis ? require('./config/redis').default : {};

const echoServer = new LaravelEchoServer();

echoServer.run({
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
    metrics: {
        enabled: ENABLE_METRICS,
        collectDefaultMetrics: COLLECT_DEFAULT_METRICS,
        path: METRICS_PATH,
        port: METRICS_PORT,
    },
    devMode: DEV_MODE,
    host: HOST || null,
    port: PORT,
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
