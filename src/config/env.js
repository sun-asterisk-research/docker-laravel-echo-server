import {
    cleanEnv,
    bool,
    host,
    port,
    str,
    url,
} from 'envalid';

const validEnv = cleanEnv(process.env, {
    HOST: host({
        default: undefined,
        desc: 'The host of the socket.io server',
    }),

    PORT: port({
        default: 6001,
        desc: '	The port that the socket.io server should run on',
    }),

    AUTH_HOST: url({
        default: 'http://localhost',
        desc: 'The host of the server that authenticates private and presence channels',
    }),

    AUTH_ENDPOINT: str({
        default: '/broadcasting/auth',
        desc: 'The route that authenticates private channels',
    }),

    ENABLE_HTTP: bool({
        default: true,
        desc: 'Enable HTTP subscriber',
    }),

    ENABLE_REDIS: bool({
        default: true,
        desc: 'Enable Redis subscriber',
    }),

    DATABASE: str({
        default: 'redis',
        choices: ['sqlite', 'redis'],
        desc: 'Database to store presence channels data',
    }),

    SQLITE_DB_PATH: str({
        default: '/database/laravel-echo-server.sqlite',
        desc: 'SQLite database path',
    }),

    ALLOW_CORS: bool({
        default: false,
        desc: 'Enable CORS',
    }),

    ALLOW_ORIGIN: str({
        default: '',
        desc: 'Access control allowed origins',
    }),

    ALLOW_METHODS: str({
        default: '',
        desc: 'Access control allowed methods',
    }),

    ALLOW_HEADERS: str({
        default: '',
        desc: 'Access control allowed headers',
    }),

    ENABLE_METRICS: bool({
        default: false,
        desc: 'Enable metrics endpoint for Prometheus',
    }),

    COLLECT_DEFAULT_METRICS: bool({
        default: false,
        desc: 'Collect default Prometheus metrics',
    }),

    METRICS_PATH: str({
        default: '/metrics',
        desc: 'Metrics path',
    }),

    METRICS_PORT: port({
        default: 9090,
        desc: 'Metrics port',
    }),

    DEV_MODE: bool({
        default: false,
        desc: 'Turn on development mode',
    })
}, {
    strict: true,
})

export const useRedis = validEnv.ENABLE_REDIS || validEnv.DATABASE === 'redis';

export const {
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
} = validEnv;
